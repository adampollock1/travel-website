import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Get all hotels with filters
router.get('/', async (req, res) => {
  try {
    const {
      destination,
      minPrice,
      maxPrice,
      stars,
      amenities,
      propertyType,
      sort = 'rating',
      page = 1,
      limit = 12
    } = req.query;
    
    const query = {};
    
    // Destination search (city or country)
    if (destination) {
      query.$or = [
        { 'location.city': { $regex: destination, $options: 'i' } },
        { 'location.country': { $regex: destination, $options: 'i' } }
      ];
    }
    
    // Price range
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }
    
    // Star rating filter
    if (stars) {
      const starArray = stars.split(',').map(Number);
      query.stars = { $in: starArray };
    }
    
    // Amenities filter
    if (amenities) {
      const amenityArray = amenities.split(',');
      query.amenities = { $all: amenityArray };
    }
    
    // Property type filter
    if (propertyType) {
      const typeArray = propertyType.split(',');
      query.propertyType = { $in: typeArray };
    }
    
    // Sorting
    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { pricePerNight: 1 };
        break;
      case 'price-high':
        sortOption = { pricePerNight: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'stars':
        sortOption = { stars: -1 };
        break;
      default:
        sortOption = { rating: -1 };
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const [hotels, total] = await Promise.all([
      Hotel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit)),
      Hotel.countDocuments(query)
    ]);
    
    res.json({
      hotels,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured hotels
router.get('/featured', async (req, res) => {
  try {
    const hotels = await Hotel.find({ featured: true })
      .sort({ rating: -1 })
      .limit(8);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular destinations
router.get('/destinations', async (req, res) => {
  try {
    const destinations = await Hotel.aggregate([
      {
        $group: {
          _id: { city: '$location.city', country: '$location.country' },
          hotelCount: { $sum: 1 },
          avgPrice: { $avg: '$pricePerNight' },
          image: { $first: { $arrayElemAt: ['$images', 0] } }
        }
      },
      { $sort: { hotelCount: -1 } },
      { $limit: 6 }
    ]);
    
    res.json(destinations.map(d => ({
      city: d._id.city,
      country: d._id.country,
      hotelCount: d.hotelCount,
      avgPrice: Math.round(d.avgPrice),
      image: d.image
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get similar hotels
router.get('/:id/similar', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    const similarHotels = await Hotel.find({
      _id: { $ne: hotel._id },
      'location.city': hotel.location.city,
      pricePerNight: {
        $gte: hotel.pricePerNight * 0.7,
        $lte: hotel.pricePerNight * 1.3
      }
    })
      .sort({ rating: -1 })
      .limit(4);
    
    res.json(similarHotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

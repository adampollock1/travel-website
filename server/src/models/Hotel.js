import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true }
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String
  }],
  propertyType: {
    type: String,
    enum: ['hotel', 'resort', 'apartment', 'villa', 'hostel', 'boutique'],
    default: 'hotel'
  },
  rooms: [{
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    beds: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for search functionality
hotelSchema.index({ 'location.city': 'text', 'location.country': 'text', name: 'text' });
hotelSchema.index({ pricePerNight: 1 });
hotelSchema.index({ rating: -1 });
hotelSchema.index({ stars: 1 });

export default mongoose.model('Hotel', hotelSchema);

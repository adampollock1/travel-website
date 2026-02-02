import express from 'express';
import Favorite from '../models/Favorite.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's favorites
router.get('/', protect, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('hotel')
      .sort({ createdAt: -1 });
    
    res.json(favorites.map(f => f.hotel));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if hotel is favorited
router.get('/check/:hotelId', protect, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      user: req.user._id,
      hotel: req.params.hotelId
    });
    
    res.json({ isFavorited: !!favorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to favorites
router.post('/:hotelId', protect, async (req, res) => {
  try {
    const existing = await Favorite.findOne({
      user: req.user._id,
      hotel: req.params.hotelId
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Already in favorites' });
    }
    
    const favorite = await Favorite.create({
      user: req.user._id,
      hotel: req.params.hotelId
    });
    
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from favorites
router.delete('/:hotelId', protect, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      hotel: req.params.hotelId
    });
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

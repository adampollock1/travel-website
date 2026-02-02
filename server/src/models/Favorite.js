import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique user-hotel combination
favoriteSchema.index({ user: 1, hotel: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);

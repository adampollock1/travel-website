import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { StarRating, ScoreRating } from '../common/Rating';
import Badge from '../common/Badge';
import useFavoritesStore from '../../stores/favoritesStore';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

const HotelCard = ({ hotel, index = 0 }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { isFavorited, toggleFavorite } = useFavoritesStore();
  const { user } = useAuthStore();

  const isFav = isFavorited(hotel._id);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }

    const result = await toggleFavorite(hotel._id);
    if (result.success) {
      toast.success(isFav ? 'Removed from favorites' : 'Added to favorites');
    } else {
      toast.error(result.error);
    }
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/hotel/${hotel._id}`}>
        <div className="group bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
          {/* Image Section */}
          <div className="relative h-52 overflow-hidden">
            <motion.img
              key={currentImage}
              src={hotel.images[currentImage]}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Image navigation */}
            {hotel.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronLeft size={18} className="text-ocean-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronRight size={18} className="text-ocean-800" />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {hotel.images.slice(0, 5).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === currentImage ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Favorite button */}
            <motion.button
              onClick={handleFavorite}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={18}
                className={isFav ? 'text-coral-500 fill-coral-500' : 'text-ocean-600'}
              />
            </motion.button>

            {/* Featured badge */}
            {hotel.featured && (
              <Badge variant="primary" size="sm" className="absolute top-3 left-3">
                Featured
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Location & Stars */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-ocean-500 text-sm">
                <MapPin size={14} />
                <span>{hotel.location.city}, {hotel.location.country}</span>
              </div>
              <StarRating stars={hotel.stars} size={14} />
            </div>

            {/* Name */}
            <h3 className="font-heading font-bold text-lg text-ocean-800 mb-2 line-clamp-1 group-hover:text-coral-500 transition-colors">
              {hotel.name}
            </h3>

            {/* Amenities preview */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {hotel.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="subtle" size="sm">
                  {amenity}
                </Badge>
              ))}
              {hotel.amenities.length > 3 && (
                <Badge variant="outline" size="sm">
                  +{hotel.amenities.length - 3}
                </Badge>
              )}
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pt-3 border-t border-sand-200">
              <div>
                <span className="text-xl font-bold text-ocean-800">${hotel.pricePerNight}</span>
                <span className="text-ocean-500 text-sm"> / night</span>
              </div>
              <ScoreRating score={hotel.rating} reviewCount={hotel.reviewCount} size="sm" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HotelCard;

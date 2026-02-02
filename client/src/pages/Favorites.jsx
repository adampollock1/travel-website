import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import useFavoritesStore from '../stores/favoritesStore';
import { HotelCard } from '../components/hotels';
import { SkeletonCard } from '../components/common';
import Button from '../components/common/Button';

const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { favorites, isLoading, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/favorites' } } });
      return;
    }
    fetchFavorites();
  }, [user, navigate, fetchFavorites]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sand-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-ocean-800 mb-2">
            Saved Hotels
          </h1>
          <p className="text-ocean-600">
            {favorites.length > 0
              ? `You have ${favorites.length} saved hotel${favorites.length > 1 ? 's' : ''}`
              : 'Hotels you save will appear here'}
          </p>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-ocean-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-ocean-800 mb-3">
              No saved hotels yet
            </h2>
            <p className="text-ocean-600 mb-8 max-w-md mx-auto">
              Start exploring hotels and tap the heart icon to save your favorites for later.
            </p>
            <Link to="/search">
              <Button variant="primary" size="lg">
                Explore Hotels
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {favorites.map((hotel, index) => (
              <HotelCard key={hotel._id} hotel={hotel} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

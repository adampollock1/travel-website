import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link
        to={`/search?destination=${destination.city}`}
        className="group relative block h-64 rounded-2xl overflow-hidden"
      >
        {/* Background Image */}
        <img
          src={destination.image}
          alt={destination.city}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-ocean-900/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <h3 className="font-heading font-bold text-2xl text-white mb-1">
            {destination.city}
          </h3>
          <p className="text-sand-200 text-sm">
            {destination.country}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-coral-400 font-semibold">
              {destination.hotelCount} hotels
            </span>
            <span className="text-sand-300">•</span>
            <span className="text-sand-300">
              from ${destination.avgPrice}/night
            </span>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
      </Link>
    </motion.div>
  );
};

export default DestinationCard;

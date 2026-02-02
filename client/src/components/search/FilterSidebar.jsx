import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import useSearchStore from '../../stores/searchStore';
import Button from '../common/Button';

const amenitiesList = [
  'Free WiFi',
  'Pool',
  'Spa',
  'Fitness Center',
  'Restaurant',
  'Room Service',
  'Bar',
  'Parking',
  'Pet Friendly',
  'Air Conditioning',
  'Concierge',
  'Beach Access',
];

const propertyTypes = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'resort', label: 'Resort' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'hostel', label: 'Hostel' },
];

const FilterSidebar = ({ isOpen, onClose, isMobile = false }) => {
  const { filters, setFilters, resetFilters } = useSearchStore();
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    stars: true,
    propertyType: true,
    amenities: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (type, value) => {
    setFilters({ [type]: Number(value) });
  };

  const handleStarToggle = (star) => {
    const newStars = filters.stars.includes(star)
      ? filters.stars.filter(s => s !== star)
      : [...filters.stars, star];
    setFilters({ stars: newStars });
  };

  const handlePropertyTypeToggle = (type) => {
    const newTypes = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter(t => t !== type)
      : [...filters.propertyTypes, type];
    setFilters({ propertyTypes: newTypes });
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ amenities: newAmenities });
  };

  const FilterSection = ({ title, name, children }) => (
    <div className="border-b border-sand-200 py-4">
      <button
        onClick={() => toggleSection(name)}
        className="w-full flex items-center justify-between text-left font-medium text-ocean-800 mb-3"
      >
        {title}
        {expandedSections[name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {expandedSections[name] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const content = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-sand-200">
        <h3 className="font-heading font-bold text-lg text-ocean-800">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-coral-500 hover:text-coral-600"
        >
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <FilterSection title="Price per night" name="price">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-ocean-500 mb-1 block">Min</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-500">$</span>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-sand-300 rounded-lg text-sm focus:outline-none focus:border-coral-500"
                  min="0"
                />
              </div>
            </div>
            <span className="text-ocean-400 pt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-ocean-500 mb-1 block">Max</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-500">$</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-sand-300 rounded-lg text-sm focus:outline-none focus:border-coral-500"
                  min="0"
                />
              </div>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
            className="w-full accent-coral-500"
          />
        </div>
      </FilterSection>

      {/* Star Rating */}
      <FilterSection title="Star Rating" name="stars">
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => handleStarToggle(star)}
              className={`
                flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors
                ${filters.stars.includes(star)
                  ? 'bg-coral-500 border-coral-500 text-white'
                  : 'bg-white border-sand-300 text-ocean-700 hover:border-coral-500'
                }
              `}
            >
              <Star size={14} className={filters.stars.includes(star) ? 'fill-white' : 'fill-amber-400 text-amber-400'} />
              <span className="text-sm font-medium">{star}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Property Type */}
      <FilterSection title="Property Type" name="propertyType">
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                  ${filters.propertyTypes.includes(type.value)
                    ? 'bg-coral-500 border-coral-500'
                    : 'border-sand-300 group-hover:border-coral-500'
                  }
                `}
                onClick={() => handlePropertyTypeToggle(type.value)}
              >
                {filters.propertyTypes.includes(type.value) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-ocean-700">{type.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Amenities */}
      <FilterSection title="Amenities" name="amenities">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                  ${filters.amenities.includes(amenity)
                    ? 'bg-coral-500 border-coral-500'
                    : 'border-sand-300 group-hover:border-coral-500'
                  }
                `}
                onClick={() => handleAmenityToggle(amenity)}
              >
                {filters.amenities.includes(amenity) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-ocean-700">{amenity}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-sand-200">
                <h3 className="font-heading font-bold text-lg">Filters</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-sand-100">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {content}
              </div>
              <div className="p-4 border-t border-sand-200">
                <Button variant="primary" className="w-full" onClick={onClose}>
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
      {content}
    </div>
  );
};

export default FilterSidebar;

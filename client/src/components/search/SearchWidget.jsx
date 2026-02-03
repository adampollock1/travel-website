import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import useSearchStore from '../../stores/searchStore';
import DateRangePicker from './DateRangePicker';
import GuestSelector from './GuestSelector';
import Button from '../common/Button';

const popularDestinations = [
  { city: 'Paris', country: 'France', emoji: '🇫🇷' },
  { city: 'Tokyo', country: 'Japan', emoji: '🇯🇵' },
  { city: 'New York', country: 'United States', emoji: '🇺🇸' },
  { city: 'Dubai', country: 'United Arab Emirates', emoji: '🇦🇪' },
];

const SearchWidget = ({ variant = 'hero', className = '' }) => {
  const navigate = useNavigate();
  const {
    destination,
    setDestination,
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    guests,
    setGuests,
  } = useSearchStore();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(destination);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setDestination(inputValue);
    navigate('/search');
  };

  const handleDestinationSelect = (city) => {
    setInputValue(city);
    setDestination(city);
    setShowSuggestions(false);
  };

  const filteredDestinations = inputValue
    ? popularDestinations.filter(
        d => d.city.toLowerCase().includes(inputValue.toLowerCase()) ||
             d.country.toLowerCase().includes(inputValue.toLowerCase())
      )
    : popularDestinations;

  const isHero = variant === 'hero';

  return (
    <motion.form
      onSubmit={handleSearch}
      className={`
        ${isHero 
          ? 'bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6' 
          : 'bg-white rounded-xl shadow-card p-4'
        }
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`grid gap-3 ${isHero ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'} items-end`}>
        {/* Destination */}
        <div className={`relative ${isHero ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
          <label className="block text-xs text-ocean-500 font-medium mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-400" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Where are you going?"
              className="w-full h-[54px] pl-11 pr-4 bg-white border border-sand-300 rounded-xl text-ocean-800 placeholder:text-ocean-400 hover:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all"
            />
          </div>

          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                ref={suggestionsRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-sand-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden z-50"
              >
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-medium text-ocean-500 uppercase tracking-wide">
                    Popular destinations
                  </p>
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.city}
                      type="button"
                      onClick={() => handleDestinationSelect(dest.city)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sand-50 transition-colors text-left"
                    >
                      <span className="text-xl">{dest.emoji}</span>
                      <div>
                        <span className="block font-medium text-ocean-800">{dest.city}</span>
                        <span className="block text-sm text-ocean-500">{dest.country}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dates */}
        <div className="min-w-0">
          <label className="block text-xs text-ocean-500 font-medium mb-2">
            Dates
          </label>
          <DateRangePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />
        </div>

        {/* Guests */}
        <div className="min-w-0">
          <label className="block text-xs text-ocean-500 font-medium mb-2">
            Guests & Rooms
          </label>
          <GuestSelector
            guests={guests}
            onChange={setGuests}
          />
        </div>

        {/* Search Button */}
        <div className={`${isHero ? 'sm:col-span-2 lg:col-span-1' : ''} self-end`}>
          <Button
            type="submit"
            variant="primary"
            className="w-full h-[54px] text-base"
          >
            <Search size={20} />
            Search
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchWidget;

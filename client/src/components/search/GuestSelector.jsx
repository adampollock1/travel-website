import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Minus, Plus, ChevronDown } from 'lucide-react';

const GuestSelector = ({ guests, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateGuests = (type, value) => {
    const newValue = Math.max(type === 'rooms' ? 1 : 0, Math.min(type === 'rooms' ? 10 : 20, guests[type] + value));
    onChange({ ...guests, [type]: newValue });
  };

  const totalGuests = guests.adults + guests.children;

  const CounterButton = ({ onClick, disabled, children }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-full border border-sand-300 flex items-center justify-center text-ocean-600 hover:border-coral-500 hover:text-coral-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[54px] flex items-center gap-3 px-4 bg-white border border-sand-300 rounded-xl hover:border-coral-500 transition-colors text-left"
      >
        <Users size={18} className="text-ocean-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block text-xs text-ocean-500 font-medium">Guests</span>
          <span className="block text-ocean-800 text-sm truncate">
            {totalGuests} guest{totalGuests !== 1 ? 's' : ''}, {guests.rooms} room{guests.rooms !== 1 ? 's' : ''}
          </span>
        </div>
        <ChevronDown size={16} className={`text-ocean-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-dropdown p-4 z-50"
          >
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-ocean-800">Adults</span>
                  <p className="text-sm text-ocean-500">Ages 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <CounterButton 
                    onClick={() => updateGuests('adults', -1)}
                    disabled={guests.adults <= 1}
                  >
                    <Minus size={16} />
                  </CounterButton>
                  <span className="w-8 text-center font-medium">{guests.adults}</span>
                  <CounterButton 
                    onClick={() => updateGuests('adults', 1)}
                    disabled={guests.adults >= 20}
                  >
                    <Plus size={16} />
                  </CounterButton>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-ocean-800">Children</span>
                  <p className="text-sm text-ocean-500">Ages 0-12</p>
                </div>
                <div className="flex items-center gap-3">
                  <CounterButton 
                    onClick={() => updateGuests('children', -1)}
                    disabled={guests.children <= 0}
                  >
                    <Minus size={16} />
                  </CounterButton>
                  <span className="w-8 text-center font-medium">{guests.children}</span>
                  <CounterButton 
                    onClick={() => updateGuests('children', 1)}
                    disabled={guests.children >= 20}
                  >
                    <Plus size={16} />
                  </CounterButton>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center justify-between pt-4 border-t border-sand-200">
                <div>
                  <span className="font-medium text-ocean-800">Rooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <CounterButton 
                    onClick={() => updateGuests('rooms', -1)}
                    disabled={guests.rooms <= 1}
                  >
                    <Minus size={16} />
                  </CounterButton>
                  <span className="w-8 text-center font-medium">{guests.rooms}</span>
                  <CounterButton 
                    onClick={() => updateGuests('rooms', 1)}
                    disabled={guests.rooms >= 10}
                  >
                    <Plus size={16} />
                  </CounterButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuestSelector;

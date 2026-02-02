import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, startOfToday } from 'date-fns';
import { Calendar, ChevronDown } from 'lucide-react';
import 'react-day-picker/dist/style.css';

const DateRangePicker = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selecting, setSelecting] = useState('checkIn'); // 'checkIn' or 'checkOut'
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const today = startOfToday();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDayClick = (day) => {
    if (selecting === 'checkIn') {
      onCheckInChange(day);
      if (day >= checkOut) {
        onCheckOutChange(null);
      }
      setSelecting('checkOut');
    } else {
      onCheckOutChange(day);
      setIsOpen(false);
      setSelecting('checkIn');
    }
  };

  const disabledDays = [
    { before: today },
    ...(selecting === 'checkOut' && checkIn ? [{ before: checkIn }] : [])
  ];

  return (
    <div ref={ref} className={`relative ${isOpen ? 'z-50' : ''} ${className}`}>
      <div className="flex w-full overflow-hidden">
        {/* Check-in */}
        <button
          type="button"
          onClick={() => { setSelecting('checkIn'); setIsOpen(true); }}
          className={`flex-1 min-w-0 flex items-center gap-2 px-3 py-3 bg-white border border-sand-300 rounded-l-xl hover:border-coral-500 transition-colors text-left ${isOpen && selecting === 'checkIn' ? 'border-coral-500 ring-2 ring-coral-500/20' : ''}`}
        >
          <Calendar size={18} className="text-ocean-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="block text-xs text-ocean-500 font-medium">Check-in</span>
            <span className="block text-ocean-800 text-sm truncate">
              {checkIn ? format(checkIn, 'MMM d') : 'Add date'}
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-px bg-sand-300 shrink-0" />

        {/* Check-out */}
        <button
          type="button"
          onClick={() => { setSelecting('checkOut'); setIsOpen(true); }}
          className={`flex-1 min-w-0 flex items-center gap-2 px-3 py-3 bg-white border border-sand-300 rounded-r-xl hover:border-coral-500 transition-colors text-left ${isOpen && selecting === 'checkOut' ? 'border-coral-500 ring-2 ring-coral-500/20' : ''}`}
        >
          <div className="flex-1 min-w-0">
            <span className="block text-xs text-ocean-500 font-medium">Check-out</span>
            <span className="block text-ocean-800 text-sm truncate">
              {checkOut ? format(checkOut, 'MMM d') : 'Add date'}
            </span>
          </div>
          <ChevronDown size={16} className={`text-ocean-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute top-full mt-2 bg-white rounded-xl shadow-dropdown p-4 z-[60] ${isMobile ? 'left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[320px]' : 'left-0'}`}
          >
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setSelecting('checkIn')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selecting === 'checkIn' ? 'bg-coral-500 text-white' : 'bg-sand-100 text-ocean-700'}`}
              >
                Check-in
              </button>
              <button
                type="button"
                onClick={() => setSelecting('checkOut')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selecting === 'checkOut' ? 'bg-coral-500 text-white' : 'bg-sand-100 text-ocean-700'}`}
              >
                Check-out
              </button>
            </div>
            
            <DayPicker
              mode="single"
              selected={selecting === 'checkIn' ? checkIn : checkOut}
              onDayClick={handleDayClick}
              disabled={disabledDays}
              numberOfMonths={isMobile ? 1 : 2}
              showOutsideDays={false}
              classNames={{
                months: isMobile ? 'flex flex-col' : 'flex gap-4',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium text-ocean-800',
                nav: 'space-x-1 flex items-center',
                nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-ocean-500 rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-coral-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-sand-100 rounded-lg transition-colors',
                day_selected: 'bg-coral-500 text-white hover:bg-coral-600 hover:text-white focus:bg-coral-500 focus:text-white',
                day_today: 'bg-sand-200 text-ocean-800',
                day_outside: 'text-ocean-300 opacity-50',
                day_disabled: 'text-ocean-300 opacity-50 cursor-not-allowed hover:bg-transparent',
                day_hidden: 'invisible',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;

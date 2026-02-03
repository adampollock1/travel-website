import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  XCircle,
  BedDouble,
  Users,
  Star
} from 'lucide-react';
import { format, isPast, isFuture, isToday } from 'date-fns';
import useAuthStore from '../stores/authStore';
import useBookingStore from '../stores/bookingStore';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import toast from 'react-hot-toast';

const BookingCard = ({ booking, onCancel }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const { hotel, room, checkIn, checkOut, nights, guests, totalPrice, status, id, guestInfo } = booking;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const isUpcoming = isFuture(checkInDate) && status === 'confirmed';
  const isActive = (isToday(checkInDate) || (isPast(checkInDate) && isFuture(checkOutDate))) && status === 'confirmed';
  const isPastBooking = isPast(checkOutDate) && status === 'confirmed';
  const isCancelled = status === 'cancelled';

  const getStatusBadge = () => {
    if (isCancelled) {
      return <Badge variant="error">Cancelled</Badge>;
    }
    if (isActive) {
      return <Badge variant="success">Active</Badge>;
    }
    if (isUpcoming) {
      return <Badge variant="primary">Upcoming</Badge>;
    }
    if (isPastBooking) {
      return <Badge variant="subtle">Completed</Badge>;
    }
    return null;
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    setIsCancelling(true);
    try {
      await onCancel(id);
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-2xl shadow-card overflow-hidden ${isCancelled ? 'opacity-60' : ''}`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-44 md:w-52 h-40 sm:h-auto relative flex-shrink-0">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            {getStatusBadge()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex flex-col h-full">
            {/* Top Row: Hotel Name & Price */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-heading font-bold text-ocean-800 leading-tight truncate">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-0.5 text-xs text-ocean-500">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {hotel.stars}
                  </span>
                  <span className="text-ocean-300">•</span>
                  <span className="text-sm text-ocean-600 flex items-center gap-1">
                    <MapPin size={12} />
                    {hotel.location.city}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-ocean-800">${totalPrice}</p>
                <p className="text-xs text-ocean-500">Total</p>
              </div>
            </div>

            {/* Booking Details - Compact Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ocean-600 mb-3 pb-3 border-b border-sand-100">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-coral-500" />
                <span>{format(checkInDate, 'MMM d')} - {format(checkOutDate, 'MMM d')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-coral-500" />
                <span>{nights} night{nights !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BedDouble size={14} className="text-coral-500" />
                <span>{room.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-coral-500" />
                <span>{guests.adults + guests.children} guest{guests.adults + guests.children !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Bottom Row: Confirmation & Actions */}
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xs text-ocean-400">
                <span className="font-mono">{id}</span>
              </p>
              
              <div className="flex items-center gap-2">
                {isUpcoming && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 text-xs px-3 py-1.5"
                    onClick={handleCancel}
                    isLoading={isCancelling}
                    disabled={isCancelling}
                  >
                    Cancel
                  </Button>
                )}
                <Link to={`/hotel/${hotel._id}`}>
                  <Button variant="outline" size="sm" className="text-xs px-3 py-1.5">
                    View Hotel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Bookings = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getUserBookings, cancelBooking } = useBookingStore();
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/bookings' } } });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const allBookings = getUserBookings(user._id);
  
  const now = new Date();
  const upcomingBookings = allBookings.filter(b => 
    isFuture(new Date(b.checkIn)) && b.status === 'confirmed'
  ).sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  
  const activeBookings = allBookings.filter(b => {
    const checkIn = new Date(b.checkIn);
    const checkOut = new Date(b.checkOut);
    return (isToday(checkIn) || (isPast(checkIn) && isFuture(checkOut))) && b.status === 'confirmed';
  });
  
  const pastBookings = allBookings.filter(b => 
    isPast(new Date(b.checkOut)) && b.status === 'confirmed'
  ).sort((a, b) => new Date(b.checkOut) - new Date(a.checkOut));
  
  const cancelledBookings = allBookings.filter(b => 
    b.status === 'cancelled'
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingBookings.length + activeBookings.length },
    { id: 'past', label: 'Past', count: pastBookings.length },
    { id: 'cancelled', label: 'Cancelled', count: cancelledBookings.length },
  ];

  const getDisplayedBookings = () => {
    switch (activeTab) {
      case 'upcoming':
        return [...activeBookings, ...upcomingBookings];
      case 'past':
        return pastBookings;
      case 'cancelled':
        return cancelledBookings;
      default:
        return [];
    }
  };

  const displayedBookings = getDisplayedBookings();

  return (
    <div className="min-h-screen bg-sand-50 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-ocean-800 mb-2">
            My Bookings
          </h1>
          <p className="text-ocean-600">
            View and manage your hotel reservations
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-8 border-b border-sand-200 overflow-x-auto pb-px"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-coral-500'
                  : 'text-ocean-600 hover:text-ocean-800'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-coral-100 text-coral-600'
                    : 'bg-sand-200 text-ocean-600'
                }`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral-500"
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {allBookings.length === 0 ? (
            <motion.div
              key="empty-all"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="w-24 h-24 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={40} className="text-ocean-400" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-ocean-800 mb-3">
                No bookings yet
              </h2>
              <p className="text-ocean-600 mb-8 max-w-md mx-auto">
                Start exploring amazing hotels and book your perfect getaway.
              </p>
              <Link to="/search">
                <Button variant="primary" size="lg">
                  Explore Hotels
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </motion.div>
          ) : displayedBookings.length === 0 ? (
            <motion.div
              key={`empty-${activeTab}`}
              className="text-center py-16"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="w-20 h-20 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'upcoming' && <Calendar size={32} className="text-ocean-400" />}
                {activeTab === 'past' && <CheckCircle size={32} className="text-ocean-400" />}
                {activeTab === 'cancelled' && <XCircle size={32} className="text-ocean-400" />}
              </div>
              <h3 className="text-xl font-heading font-bold text-ocean-800 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-ocean-600">
                {activeTab === 'upcoming' && "You don't have any upcoming reservations."}
                {activeTab === 'past' && "You haven't completed any stays yet."}
                {activeTab === 'cancelled' && "You haven't cancelled any bookings."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence>
                {displayedBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onCancel={cancelBooking}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bookings;

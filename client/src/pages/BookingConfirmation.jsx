import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Users, 
  BedDouble,
  Mail,
  Phone,
  Download,
  ChevronRight,
  Home,
  List
} from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/common/Button';
import { StarRating } from '../components/common/Rating';
import useBookingStore from '../stores/bookingStore';
import useAuthStore from '../stores/authStore';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBookingById } = useBookingStore();
  const { user } = useAuthStore();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const bookingData = getBookingById(bookingId);
    if (bookingData) {
      setBooking(bookingData);
    } else {
      navigate('/');
    }
  }, [bookingId, getBookingById, user, navigate]);

  if (!booking) {
    return null;
  }

  const { hotel, room, checkIn, checkOut, nights, guests, guestInfo, totalPrice, id, createdAt } = booking;

  return (
    <div className="min-h-screen bg-sand-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-ocean-800 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-ocean-600 max-w-md mx-auto">
            Your reservation has been successfully made. A confirmation email has been sent to {guestInfo.email}.
          </p>
        </motion.div>

        {/* Confirmation Number */}
        <motion.div
          className="bg-coral-50 rounded-2xl p-6 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm text-coral-600 mb-1">Confirmation Number</p>
          <p className="text-3xl font-mono font-bold text-coral-700 tracking-wider">
            {id}
          </p>
          <p className="text-sm text-coral-600 mt-2">
            Booked on {format(new Date(createdAt), 'MMMM d, yyyy at h:mm a')}
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Hotel Header */}
          <div className="relative h-48 md:h-64">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <StarRating stars={hotel.stars} variant="light" size="sm" />
              <h2 className="text-2xl font-heading font-bold mt-2">
                {hotel.name}
              </h2>
              <p className="flex items-center gap-1 text-white/90 mt-1">
                <MapPin size={16} />
                {hotel.location.city}, {hotel.location.country}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Stay Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-ocean-500 uppercase tracking-wider mb-3">
                    Stay Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <BedDouble size={20} className="text-coral-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ocean-800">{room.name}</p>
                        <p className="text-sm text-ocean-600">{room.beds}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-coral-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ocean-800">
                          {format(new Date(checkIn), 'EEE, MMM d')} - {format(new Date(checkOut), 'EEE, MMM d, yyyy')}
                        </p>
                        <p className="text-sm text-ocean-600">{nights} night{nights !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users size={20} className="text-coral-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ocean-800">
                          {guests.adults} Adult{guests.adults !== 1 ? 's' : ''}
                          {guests.children > 0 && `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}`}
                        </p>
                        <p className="text-sm text-ocean-600">{guests.rooms} Room{guests.rooms !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Guest Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-ocean-500 uppercase tracking-wider mb-3">
                    Guest Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users size={20} className="text-coral-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ocean-800">
                          {guestInfo.firstName} {guestInfo.lastName}
                        </p>
                        <p className="text-sm text-ocean-600">Primary Guest</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail size={20} className="text-coral-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ocean-800">{guestInfo.email}</p>
                        <p className="text-sm text-ocean-600">Email</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone size={20} className="text-coral-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-ocean-800">{guestInfo.phone}</p>
                        <p className="text-sm text-ocean-600">Phone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-sand-200 flex items-center justify-between">
              <span className="text-lg font-medium text-ocean-700">Total Paid</span>
              <span className="text-2xl font-bold text-ocean-800">${totalPrice}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/bookings">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <List size={20} />
              View All Bookings
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home size={20} />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.p
          className="text-center text-sm text-ocean-500 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Need help? Contact us at support@voyagerstays.com or call 1-800-VOYAGER
        </motion.p>
      </div>
    </div>
  );
};

export default BookingConfirmation;

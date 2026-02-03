import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard,
  Lock,
  ChevronRight,
  Star,
  BedDouble,
  AlertCircle
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { StarRating } from '../components/common/Rating';
import useBookingStore from '../stores/bookingStore';
import useAuthStore from '../stores/authStore';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { currentBooking, createBooking, clearCurrentBooking } = useBookingStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    specialRequests: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  // Redirect if no booking in progress or not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Please log in to complete your booking');
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    if (!currentBooking) {
      toast.error('No booking in progress');
      navigate('/');
    }
  }, [currentBooking, user, navigate]);

  // Pre-fill email when user is available
  useEffect(() => {
    if (user?.email && !guestInfo.email) {
      setGuestInfo(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  if (!currentBooking || !user) {
    return null;
  }

  const { hotel, room, checkIn, checkOut, nights, guests, pricing, totalPrice } = currentBooking;

  const validateForm = () => {
    const newErrors = {};
    
    if (!guestInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!guestInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!guestInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) newErrors.email = 'Invalid email format';
    if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Invalid card number';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePaymentChange = (field, value) => {
    let formattedValue = value;
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await createBooking(guestInfo);
      
      if (result.success) {
        toast.success('Booking confirmed!');
        navigate(`/booking-confirmation/${result.booking.id}`);
      } else {
        toast.error(result.error || 'Failed to create booking');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    clearCurrentBooking();
    navigate(`/hotel/${hotel._id}`);
  };

  return (
    <div className="min-h-screen bg-sand-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ocean-600 mb-6">
          <Link to="/" className="hover:text-coral-500">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/hotel/${hotel._id}`} className="hover:text-coral-500">{hotel.name}</Link>
          <ChevronRight size={14} />
          <span className="text-ocean-800 font-medium">Checkout</span>
        </nav>

        <h1 className="text-3xl font-heading font-bold text-ocean-800 mb-8">
          Complete Your Booking
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Guest Details */}
              <motion.div
                className="bg-white rounded-2xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-heading font-bold text-ocean-800 mb-6 flex items-center gap-2">
                  <Users size={24} className="text-coral-500" />
                  Guest Details
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name *"
                    placeholder="John"
                    value={guestInfo.firstName}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name *"
                    placeholder="Doe"
                    value={guestInfo.lastName}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    error={errors.lastName}
                  />
                  <Input
                    label="Email *"
                    type="email"
                    placeholder="john@example.com"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                    error={errors.email}
                  />
                  <Input
                    label="Phone Number *"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
                    error={errors.phone}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-ocean-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-ocean-800 placeholder:text-ocean-400 focus:outline-none focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all duration-200 resize-none"
                    rows={3}
                    placeholder="Any special requests or preferences..."
                    value={guestInfo.specialRequests}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                  />
                </div>
              </motion.div>

              {/* Payment Details */}
              <motion.div
                className="bg-white rounded-2xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-heading font-bold text-ocean-800 mb-6 flex items-center gap-2">
                  <CreditCard size={24} className="text-coral-500" />
                  Payment Details
                </h2>
                
                <div className="bg-coral-50 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Lock size={20} className="text-coral-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-coral-800">Secure Payment</p>
                    <p className="text-sm text-coral-600">
                      This is a demo. No real payment will be processed.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Card Number *"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                    error={errors.cardNumber}
                    maxLength={19}
                    icon={CreditCard}
                  />
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date *"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                      error={errors.expiryDate}
                      maxLength={5}
                    />
                    <Input
                      label="CVV *"
                      placeholder="123"
                      type="password"
                      value={paymentInfo.cvv}
                      onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                      error={errors.cvv}
                      maxLength={4}
                    />
                  </div>
                  
                  <Input
                    label="Cardholder Name *"
                    placeholder="JOHN DOE"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardName: e.target.value.toUpperCase() }))}
                    error={errors.cardName}
                  />
                </div>
              </motion.div>

              {/* Cancellation Policy */}
              <motion.div
                className="bg-white rounded-2xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-heading font-bold text-ocean-800 mb-4">
                  Cancellation Policy
                </h2>
                <p className="text-ocean-600">
                  Free cancellation up to 24 hours before check-in. After that, the first night is non-refundable.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-2xl shadow-card p-6 sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-xl font-heading font-bold text-ocean-800 mb-6">
                  Booking Summary
                </h2>
                
                {/* Hotel Info */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-sand-200">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <StarRating stars={hotel.stars} size="sm" />
                    <h3 className="font-heading font-bold text-ocean-800 mt-1">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-ocean-600 flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {hotel.location.city}, {hotel.location.country}
                    </p>
                  </div>
                </div>

                {/* Room Info */}
                <div className="mb-6 pb-6 border-b border-sand-200">
                  <div className="flex items-center gap-2 text-ocean-700 mb-2">
                    <BedDouble size={18} />
                    <span className="font-medium">{room.name}</span>
                  </div>
                  <p className="text-sm text-ocean-600">
                    {room.beds} • Up to {room.capacity} guests
                  </p>
                </div>

                {/* Dates & Guests */}
                <div className="space-y-3 mb-6 pb-6 border-b border-sand-200">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-ocean-500" />
                    <div>
                      <p className="text-sm text-ocean-600">Check-in</p>
                      <p className="font-medium text-ocean-800">
                        {format(new Date(checkIn), 'EEE, MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-ocean-500" />
                    <div>
                      <p className="text-sm text-ocean-600">Check-out</p>
                      <p className="font-medium text-ocean-800">
                        {format(new Date(checkOut), 'EEE, MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-ocean-500" />
                    <div>
                      <p className="text-sm text-ocean-600">Guests</p>
                      <p className="font-medium text-ocean-800">
                        {guests.adults} Adult{guests.adults !== 1 ? 's' : ''}
                        {guests.children > 0 && `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-sand-200">
                  <div className="flex justify-between text-ocean-600">
                    <span>${room.price} x {nights} night{nights !== 1 ? 's' : ''}</span>
                    <span>${pricing.roomTotal}</span>
                  </div>
                  <div className="flex justify-between text-ocean-600">
                    <span>Cleaning fee</span>
                    <span>${pricing.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between text-ocean-600">
                    <span>Service fee</span>
                    <span>${pricing.serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-ocean-600">
                    <span>Taxes</span>
                    <span>${pricing.taxes}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-ocean-800 mb-6">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>

                <Button 
                  type="submit"
                  variant="primary" 
                  size="lg" 
                  className="w-full mb-3"
                  isLoading={isProcessing}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay $${totalPrice}`}
                </Button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full text-center text-sm text-ocean-500 hover:text-ocean-700 transition-colors"
                >
                  Cancel and go back
                </button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

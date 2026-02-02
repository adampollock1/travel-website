import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Heart, 
  Share2, 
  Wifi, 
  Car, 
  Utensils,
  Dumbbell,
  Waves,
  Coffee,
  Sparkles,
  Check,
  Users,
  BedDouble,
  ChevronRight
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { StarRating, ScoreRating } from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { SkeletonHotelDetail } from '../components/common/Skeleton';
import HotelGallery from '../components/hotels/HotelGallery';
import { HotelCard } from '../components/hotels';
import useFavoritesStore from '../stores/favoritesStore';
import useAuthStore from '../stores/authStore';
import hotelService from '../services/hotelService';
import toast from 'react-hot-toast';

// Amenity icons mapping
const amenityIcons = {
  'Free WiFi': Wifi,
  'WiFi': Wifi,
  'Parking': Car,
  'Valet Parking': Car,
  'Restaurant': Utensils,
  'Fine Dining': Utensils,
  'Fitness Center': Dumbbell,
  'Gym': Dumbbell,
  'Pool': Waves,
  'Spa': Sparkles,
  'Room Service': Coffee,
  'Bar': Coffee,
  'Concierge': Sparkles,
};

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [similarHotels, setSimilarHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const { user } = useAuthStore();
  const { isFavorited, toggleFavorite } = useFavoritesStore();
  
  const isFav = hotel ? isFavorited(hotel._id) : false;

  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true);
      try {
        const [hotelData, similarData] = await Promise.all([
          hotelService.getHotel(id),
          hotelService.getSimilarHotels(id),
        ]);
        setHotel(hotelData);
        setSimilarHotels(similarData);
        if (hotelData.rooms?.length) {
          setSelectedRoom(hotelData.rooms[0]);
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
        toast.error('Failed to load hotel details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }
    const result = await toggleFavorite(hotel._id);
    if (result.success) {
      toast.success(isFav ? 'Removed from favorites' : 'Added to favorites');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: `Check out ${hotel.name} on Voyager Stays`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sand-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonHotelDetail />
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-sand-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-ocean-800 mb-2">
            Hotel not found
          </h2>
          <p className="text-ocean-600 mb-4">
            The hotel you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/search">
            <Button variant="primary">Browse Hotels</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ocean-600 mb-6">
          <Link to="/" className="hover:text-coral-500">Home</Link>
          <ChevronRight size={14} />
          <Link to="/search" className="hover:text-coral-500">Hotels</Link>
          <ChevronRight size={14} />
          <Link 
            to={`/search?destination=${hotel.location.city}`} 
            className="hover:text-coral-500"
          >
            {hotel.location.city}
          </Link>
          <ChevronRight size={14} />
          <span className="text-ocean-800 font-medium">{hotel.name}</span>
        </nav>

        {/* Gallery */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HotelGallery images={hotel.images} hotelName={hotel.name} />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating stars={hotel.stars} />
                    <Badge variant="subtle">{hotel.propertyType}</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-ocean-800 mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center gap-2 text-ocean-600">
                    <MapPin size={18} />
                    <span>{hotel.location.address}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="rounded-full"
                  >
                    <Share2 size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFavorite}
                    className="rounded-full"
                  >
                    <Heart 
                      size={20} 
                      className={isFav ? 'text-coral-500 fill-coral-500' : ''} 
                    />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-sand-200">
                <ScoreRating score={hotel.rating} reviewCount={hotel.reviewCount} />
              </div>
            </motion.div>

            {/* Highlights */}
            {hotel.highlights?.length > 0 && (
              <motion.div
                className="bg-coral-50 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3 className="font-heading font-bold text-lg text-ocean-800 mb-4">
                  Property Highlights
                </h3>
                <div className="flex flex-wrap gap-3">
                  {hotel.highlights.map((highlight) => (
                    <Badge key={highlight} variant="primary" size="md">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-heading font-bold text-xl text-ocean-800 mb-4">
                About this property
              </h3>
              <p className="text-ocean-600 leading-relaxed">
                {hotel.description}
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="font-heading font-bold text-xl text-ocean-800 mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div 
                      key={amenity}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl"
                    >
                      <div className="w-10 h-10 bg-sand-100 rounded-lg flex items-center justify-center">
                        <Icon size={20} className="text-coral-500" />
                      </div>
                      <span className="text-ocean-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Room Options */}
            {hotel.rooms?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-heading font-bold text-xl text-ocean-800 mb-4">
                  Available Rooms
                </h3>
                <div className="space-y-4">
                  {hotel.rooms.map((room) => (
                    <div
                      key={room.name}
                      className={`p-4 bg-white rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedRoom?.name === room.name
                          ? 'border-coral-500'
                          : 'border-transparent hover:border-sand-300'
                      }`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-heading font-bold text-ocean-800 mb-1">
                            {room.name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-ocean-600">
                            <span className="flex items-center gap-1">
                              <Users size={16} />
                              Up to {room.capacity} guests
                            </span>
                            <span className="flex items-center gap-1">
                              <BedDouble size={16} />
                              {room.beds}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-ocean-800">
                            ${room.price}
                          </span>
                          <span className="text-ocean-500 text-sm">/night</span>
                          {room.available ? (
                            <p className="text-green-600 text-sm">Available</p>
                          ) : (
                            <p className="text-red-500 text-sm">Sold out</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h3 className="font-heading font-bold text-xl text-ocean-800 mb-4">
                Location
              </h3>
              <div className="h-64 rounded-2xl overflow-hidden">
                <MapContainer
                  center={[hotel.coordinates.lat, hotel.coordinates.lng]}
                  zoom={14}
                  className="w-full h-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                  <Marker position={[hotel.coordinates.lat, hotel.coordinates.lng]}>
                    <Popup>{hotel.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <p className="mt-3 text-ocean-600">
                {hotel.location.address}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl shadow-card p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-ocean-800">
                    ${selectedRoom?.price || hotel.pricePerNight}
                  </span>
                  <span className="text-ocean-500">/night</span>
                </div>
                <ScoreRating score={hotel.rating} size="sm" />
              </div>

              {/* Selected Room Info */}
              {selectedRoom && (
                <div className="bg-sand-50 rounded-xl p-4 mb-6">
                  <p className="font-medium text-ocean-800 mb-1">
                    {selectedRoom.name}
                  </p>
                  <p className="text-sm text-ocean-600">
                    {selectedRoom.beds} • Up to {selectedRoom.capacity} guests
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-sand-200">
                <div className="flex justify-between text-ocean-600">
                  <span>${selectedRoom?.price || hotel.pricePerNight} x 2 nights</span>
                  <span>${(selectedRoom?.price || hotel.pricePerNight) * 2}</span>
                </div>
                <div className="flex justify-between text-ocean-600">
                  <span>Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between text-ocean-600">
                  <span>Service fee</span>
                  <span>$30</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-ocean-800 mb-6">
                <span>Total</span>
                <span>${(selectedRoom?.price || hotel.pricePerNight) * 2 + 80}</span>
              </div>

              <Button variant="primary" size="lg" className="w-full mb-3">
                Reserve Now
              </Button>
              <p className="text-center text-sm text-ocean-500">
                You won't be charged yet
              </p>
            </motion.div>
          </div>
        </div>

        {/* Similar Hotels */}
        {similarHotels.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-heading font-bold text-ocean-800 mb-6">
              Similar Hotels in {hotel.location.city}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarHotels.map((similarHotel, index) => (
                <HotelCard key={similarHotel._id} hotel={similarHotel} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HotelDetail;

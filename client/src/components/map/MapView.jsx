import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { StarRating } from '../common/Rating';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom price marker icon
const createPriceIcon = (price, isActive = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="price-marker ${isActive ? 'active' : ''}">
        $${price}
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  });
};

// Map bounds updater component
const MapBoundsUpdater = ({ hotels }) => {
  const map = useMap();

  useEffect(() => {
    if (hotels.length > 0) {
      const bounds = L.latLngBounds(
        hotels.map(h => [h.coordinates.lat, h.coordinates.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [hotels, map]);

  return null;
};

const HotelPopup = ({ hotel }) => (
  <div className="w-64">
    <Link to={`/hotel/${hotel._id}`}>
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="w-full h-32 object-cover rounded-lg mb-2"
      />
      <div className="space-y-1">
        <h4 className="font-heading font-bold text-ocean-800 line-clamp-1">
          {hotel.name}
        </h4>
        <StarRating stars={hotel.stars} size={12} />
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-ocean-800">
            ${hotel.pricePerNight}
            <span className="text-sm font-normal text-ocean-500">/night</span>
          </span>
          <span className="text-sm text-green-600 font-medium">
            {hotel.rating.toFixed(1)} ★
          </span>
        </div>
      </div>
    </Link>
  </div>
);

const MapView = ({ hotels, isLoading, selectedHotel, onHotelSelect }) => {
  const [activeMarker, setActiveMarker] = useState(null);

  // Default center (New York if no hotels)
  const defaultCenter = [40.7128, -74.0060];
  const center = hotels.length > 0 
    ? [hotels[0].coordinates.lat, hotels[0].coordinates.lng]
    : defaultCenter;

  if (isLoading) {
    return (
      <div className="w-full h-full bg-sand-100 flex items-center justify-center rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-coral-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ocean-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="w-full h-full rounded-2xl"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      <MapBoundsUpdater hotels={hotels} />

      {hotels.map((hotel) => (
        <Marker
          key={hotel._id}
          position={[hotel.coordinates.lat, hotel.coordinates.lng]}
          icon={createPriceIcon(hotel.pricePerNight, activeMarker === hotel._id)}
          eventHandlers={{
            click: () => {
              setActiveMarker(hotel._id);
              onHotelSelect?.(hotel);
            },
            mouseover: () => setActiveMarker(hotel._id),
            mouseout: () => setActiveMarker(null),
          }}
        >
          <Popup className="hotel-popup" maxWidth={280}>
            <HotelPopup hotel={hotel} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

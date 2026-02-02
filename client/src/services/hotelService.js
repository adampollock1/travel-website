import { 
  hotels, 
  getFeaturedHotels, 
  getDestinations, 
  getHotelById, 
  getSimilarHotels, 
  searchHotels 
} from '../data/hotels';

// Simulate API delay for realistic feel
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const hotelService = {
  // Search hotels with filters
  searchHotels: async (params = {}) => {
    await delay(300); // Simulate network delay
    return searchHotels(params);
  },

  // Get featured hotels
  getFeaturedHotels: async () => {
    await delay(200);
    return getFeaturedHotels();
  },

  // Get popular destinations
  getDestinations: async () => {
    await delay(200);
    return getDestinations();
  },

  // Get single hotel details
  getHotel: async (id) => {
    await delay(200);
    const hotel = getHotelById(id);
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    return hotel;
  },

  // Get similar hotels
  getSimilarHotels: async (id) => {
    await delay(200);
    return getSimilarHotels(id);
  },
};

export default hotelService;

import { create } from 'zustand';
import { addDays, format } from 'date-fns';

const useSearchStore = create((set, get) => ({
  // Search parameters
  destination: '',
  checkIn: addDays(new Date(), 1),
  checkOut: addDays(new Date(), 3),
  guests: { adults: 2, children: 0, rooms: 1 },
  
  // Filters
  filters: {
    minPrice: 0,
    maxPrice: 2000,
    stars: [],
    amenities: [],
    propertyTypes: [],
  },
  
  // Sort
  sortBy: 'rating',
  
  // View mode
  viewMode: 'list', // 'list' or 'map'
  
  // Actions
  setDestination: (destination) => set({ destination }),
  
  setCheckIn: (checkIn) => {
    const { checkOut } = get();
    if (checkIn >= checkOut) {
      set({ checkIn, checkOut: addDays(checkIn, 1) });
    } else {
      set({ checkIn });
    }
  },
  
  setCheckOut: (checkOut) => set({ checkOut }),
  
  setGuests: (guests) => set({ guests }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  resetFilters: () => set({
    filters: {
      minPrice: 0,
      maxPrice: 2000,
      stars: [],
      amenities: [],
      propertyTypes: [],
    }
  }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  // Build query string for API
  getQueryParams: () => {
    const { destination, checkIn, checkOut, guests, filters, sortBy } = get();
    const params = new URLSearchParams();
    
    if (destination) params.append('destination', destination);
    if (checkIn) params.append('checkIn', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.append('checkOut', format(checkOut, 'yyyy-MM-dd'));
    if (guests.adults) params.append('adults', guests.adults);
    if (guests.children) params.append('children', guests.children);
    if (guests.rooms) params.append('rooms', guests.rooms);
    
    if (filters.minPrice > 0) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice < 2000) params.append('maxPrice', filters.maxPrice);
    if (filters.stars.length) params.append('stars', filters.stars.join(','));
    if (filters.amenities.length) params.append('amenities', filters.amenities.join(','));
    if (filters.propertyTypes.length) params.append('propertyType', filters.propertyTypes.join(','));
    
    params.append('sort', sortBy);
    
    return params.toString();
  },
}));

export default useSearchStore;

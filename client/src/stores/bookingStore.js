import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateBookingId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'VYG-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const useBookingStore = create(
  persist(
    (set, get) => ({
      // All bookings stored by user ID
      bookings: [],
      
      // Current booking in progress (for checkout flow)
      currentBooking: null,
      
      // Set current booking data when user clicks "Reserve Now"
      setCurrentBooking: (bookingData) => {
        set({ currentBooking: bookingData });
      },
      
      // Clear current booking
      clearCurrentBooking: () => {
        set({ currentBooking: null });
      },
      
      // Create a new booking
      createBooking: async (guestInfo) => {
        const { currentBooking, bookings } = get();
        
        if (!currentBooking) {
          return { success: false, error: 'No booking in progress' };
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newBooking = {
          id: generateBookingId(),
          oderId: currentBooking.userId,
          hotel: {
            _id: currentBooking.hotel._id,
            name: currentBooking.hotel.name,
            location: currentBooking.hotel.location,
            images: currentBooking.hotel.images,
            stars: currentBooking.hotel.stars,
          },
          room: currentBooking.room,
          checkIn: currentBooking.checkIn,
          checkOut: currentBooking.checkOut,
          nights: currentBooking.nights,
          guests: currentBooking.guests,
          pricing: currentBooking.pricing,
          totalPrice: currentBooking.totalPrice,
          status: 'confirmed',
          guestInfo,
          createdAt: new Date().toISOString(),
        };
        
        set({
          bookings: [...bookings, newBooking],
          currentBooking: null,
        });
        
        return { success: true, booking: newBooking };
      },
      
      // Get bookings for a specific user
      getUserBookings: (userId) => {
        const { bookings } = get();
        return bookings.filter(b => b.oderId === userId);
      },
      
      // Get a specific booking by ID
      getBookingById: (bookingId) => {
        const { bookings } = get();
        return bookings.find(b => b.id === bookingId);
      },
      
      // Cancel a booking
      cancelBooking: async (bookingId) => {
        const { bookings } = get();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const updatedBookings = bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        );
        
        set({ bookings: updatedBookings });
        return { success: true };
      },
      
      // Update booking status (e.g., mark as completed)
      updateBookingStatus: (bookingId, status) => {
        const { bookings } = get();
        const updatedBookings = bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status }
            : booking
        );
        set({ bookings: updatedBookings });
      },
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);

export default useBookingStore;

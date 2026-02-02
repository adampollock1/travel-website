import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getHotelById } from '../data/hotels';
import useAuthStore from './authStore';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      favoriteIds: new Set(),
      isLoading: false,
      error: null,

      fetchFavorites: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Get favorite IDs from state and fetch hotel data
        const { favoriteIds } = get();
        const favorites = Array.from(favoriteIds)
          .map(id => getHotelById(id))
          .filter(Boolean);
        
        set({ favorites, isLoading: false });
      },

      addFavorite: async (hotelId) => {
        const user = useAuthStore.getState().user;
        if (!user) return { success: false, error: 'Please login to save favorites' };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        const hotel = getHotelById(hotelId);
        if (!hotel) return { success: false, error: 'Hotel not found' };

        set((state) => {
          const newIds = new Set(state.favoriteIds);
          newIds.add(hotelId);
          return {
            favoriteIds: newIds,
            favorites: [...state.favorites, hotel]
          };
        });
        
        return { success: true };
      },

      removeFavorite: async (hotelId) => {
        const user = useAuthStore.getState().user;
        if (!user) return { success: false, error: 'Please login' };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));

        set((state) => {
          const newIds = new Set(state.favoriteIds);
          newIds.delete(hotelId);
          return {
            favoriteIds: newIds,
            favorites: state.favorites.filter(h => h._id !== hotelId)
          };
        });
        
        return { success: true };
      },

      isFavorited: (hotelId) => {
        return get().favoriteIds.has(hotelId);
      },

      toggleFavorite: async (hotelId) => {
        const isFav = get().isFavorited(hotelId);
        if (isFav) {
          return await get().removeFavorite(hotelId);
        } else {
          return await get().addFavorite(hotelId);
        }
      },

      clearFavorites: () => set({ favorites: [], favoriteIds: new Set() }),
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ 
        favoriteIds: Array.from(state.favoriteIds) // Convert Set to Array for storage
      }),
      merge: (persisted, current) => ({
        ...current,
        ...persisted,
        favoriteIds: new Set(persisted?.favoriteIds || []) // Convert Array back to Set
      }),
    }
  )
);

export default useFavoritesStore;

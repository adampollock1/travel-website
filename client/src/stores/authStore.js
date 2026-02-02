import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock user database (stored in localStorage)
const USERS_KEY = 'voyager-users';

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users = getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user || user.password !== password) {
          set({ error: 'Invalid email or password', isLoading: false });
          return { success: false, error: 'Invalid email or password' };
        }
        
        const token = `mock-token-${user._id}-${Date.now()}`;
        const userData = { _id: user._id, name: user.name, email: user.email };
        
        set({ user: userData, token, isLoading: false });
        return { success: true };
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users = getUsers();
        
        if (users.find(u => u.email === email)) {
          set({ error: 'User already exists', isLoading: false });
          return { success: false, error: 'User already exists' };
        }
        
        const newUser = {
          _id: `user-${Date.now()}`,
          name,
          email,
          password // In a real app, this would be hashed
        };
        
        users.push(newUser);
        saveUsers(users);
        
        const token = `mock-token-${newUser._id}-${Date.now()}`;
        const userData = { _id: newUser._id, name: newUser.name, email: newUser.email };
        
        set({ user: userData, token, isLoading: false });
        return { success: true };
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useAuthStore;

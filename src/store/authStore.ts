import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email,
          name: 'Demo User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          createdAt: new Date().toISOString(),
          settings: {
            currency: 'USD',
            theme: 'light',
            notifications: true,
          },
        };
        
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        localStorage.setItem('auth_token', 'mock_token');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        createdAt: new Date().toISOString(),
        settings: {
          currency: 'USD',
          theme: 'light',
          notifications: true,
        },
      };
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
    localStorage.removeItem('auth_token');
  },

  updateUser: (userData: Partial<User>) => {
    const { user } = get();
    if (user) {
      set({
        user: { ...user, ...userData },
      });
    }
  },

  clearError: () => set({ error: null }),
})); 
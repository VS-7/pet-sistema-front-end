import { create } from 'zustand';
import api from '@/src/services/api';

type User = {
  id: number;
  nome: string;
  email: string;
  tipo: 'TUTOR' | 'PETIANO';
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string, tipo: 'TUTOR' | 'PETIANO') => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ isAuthenticated: false, user: null, isLoading: false });
        return false;
      }

      const response = await api.get('/auth/me');
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isLoading: false });
      return false;
    }
  },

  login: async (email: string, senha: string) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { access_token: token, usuario: user } = response.data;
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  register: async (nome: string, email: string, senha: string, tipo: 'TUTOR' | 'PETIANO') => {
    try {
      await api.post('/auth/registrar', { nome, email, senha, tipo });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
}));
import { create } from 'zustand';
import api from '@/src/services/api';
import { User } from '@/src/types';

interface TutorStore {
  tutors: User[];
  loading: boolean;
  error: string | null;
  fetchTutors: () => Promise<void>;
  getTutorById: (id: number) => Promise<User>;
  createTutor: (tutor: Omit<User, 'id'>) => Promise<void>;
  updateTutor: (id: number, tutor: Partial<User>) => Promise<void>;
  deleteTutor: (id: number) => Promise<void>;
}

export const useTutorStore = create<TutorStore>((set) => ({
  tutors: [],
  loading: false,
  error: null,

  fetchTutors: async () => {
    set({ loading: true });
    try {
      const response = await api.get<User[]>('/tutores');
      set({ tutors: response.data });
    } catch (error) {
      set({ error: 'Erro ao buscar tutores' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getTutorById: async (id) => {
    try {
      const response = await api.get<User>(`/tutores/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTutor: async (tutor) => {
    set({ loading: true });
    try {
      const response = await api.post('/tutores', tutor);
      set((state) => ({
        tutors: [...state.tutors, response.data]
      }));
    } catch (error) {
      set({ error: 'Erro ao criar tutor' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateTutor: async (id, tutor) => {
    set({ loading: true });
    try {
      const response = await api.put(`/tutores/${id}`, tutor);
      set((state) => ({
        tutors: state.tutors.map((t) => t.id === id ? response.data : t)
      }));
    } catch (error) {
      set({ error: 'Erro ao atualizar tutor' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteTutor: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/tutores/${id}`);
      set((state) => ({
        tutors: state.tutors.filter((t) => t.id !== id)
      }));
    } catch (error) {
      set({ error: 'Erro ao deletar tutor' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
})); 
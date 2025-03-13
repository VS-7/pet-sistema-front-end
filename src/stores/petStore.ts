import { create } from 'zustand';
import api from '@/src/services/api';
import { User } from '@/src/types';

interface Pet {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  tutor: User;
  membros: User[];
  dataCriacao: string;
  dataAtualizacao?: string;
}

interface CreatePetDTO {
  nome: string;
  codigo: string;
  descricao: string;
  tutorId: number;
}

interface PetStore {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  fetchPets: () => Promise<void>;
  getPetById: (id: number) => Promise<Pet>;
  createPet: (pet: CreatePetDTO) => Promise<void>;
  updatePet: (id: number, pet: Partial<Pet>) => Promise<void>;
  deletePet: (id: number) => Promise<void>;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  loading: false,
  error: null,

  fetchPets: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/pets');
      set({ pets: response.data });
    } catch (error) {
      set({ error: 'Erro ao buscar grupos PET' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getPetById: async (id) => {
    try {
      const response = await api.get(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPet: async (pet) => {
    set({ loading: true });
    try {
      const response = await api.post('/pets', pet);
      set((state) => ({
        pets: [...state.pets, response.data]
      }));
    } catch (error) {
      set({ error: 'Erro ao criar grupo PET' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePet: async (id, pet) => {
    set({ loading: true });
    try {
      const response = await api.put(`/pets/${id}`, pet);
      set((state) => ({
        pets: state.pets.map((p) => p.id === id ? response.data : p)
      }));
    } catch (error) {
      set({ error: 'Erro ao atualizar grupo PET' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deletePet: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/pets/${id}`);
      set((state) => ({
        pets: state.pets.filter((p) => p.id !== id)
      }));
    } catch (error) {
      set({ error: 'Erro ao deletar grupo PET' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
})); 
import { create } from 'zustand';
import api from '@/src/services/api';
import { User, Pet } from '@/src/types';

interface CreatePetDTO {
  nome: string;
  codigo: string;
  descricao: string;
  tutorId: number;
}

interface AddMemberDTO {
  nome: string;
  email: string;
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
  addMember: (petId: number, memberData: AddMemberDTO) => Promise<void>;
  removeMember: (petId: number, memberId: number) => Promise<void>;
}

export const usePetStore = create<PetStore>((set, get) => ({
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

  updatePet: async (id, petData) => {
    set({ loading: true });
    try {
      const response = await api.put(`/pets/${id}`, petData);
      set((state) => ({
        pets: state.pets.map((p) => (p.id === id ? response.data : p))
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

  addMember: async (petId, memberData) => {
    set({ loading: true });
    try {
      const response = await api.post(`/pets/${petId}/membros`, memberData);
      set((state) => ({
        pets: state.pets.map((p) => {
          if (p.id === petId) {
            return {
              ...p,
              membros: [...p.membros, response.data]
            };
          }
          return p;
        })
      }));
    } catch (error) {
      set({ error: 'Erro ao adicionar membro' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeMember: async (petId, memberId) => {
    set({ loading: true });
    try {
      await api.delete(`/pets/${petId}/membros/${memberId}`);
      set((state) => ({
        pets: state.pets.map((p) => {
          if (p.id === petId) {
            return {
              ...p,
              membros: p.membros.filter(m => m.id !== memberId)
            };
          }
          return p;
        })
      }));
    } catch (error) {
      set({ error: 'Erro ao remover membro' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
})); 
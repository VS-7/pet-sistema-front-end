import { create } from 'zustand';
import api from '@/src/services/api';

type Project = {
  id: number;
  titulo: string;
  descricao: string;
  tutorId: number;
  participantesIds: number[];
};

type ProjectStore = {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  createProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/projetos');
      set({ projects: response.data });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (project) => {
    try {
      const response = await api.post('/projetos', project);
      set((state) => ({ projects: [...state.projects, response.data] }));
    } catch (error) {
      throw error;
    }
  },

  updateProject: async (id, project) => {
    try {
      const response = await api.put(`/projetos/${id}`, project);
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? response.data : p)),
      }));
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      await api.delete(`/projetos/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },
})); 
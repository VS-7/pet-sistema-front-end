import { create } from 'zustand';
import api from '@/src/services/api';
import { Project, PaginatedResponse, CreateProjectDTO } from '@/src/types';


type ProjectStore = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (project: CreateProjectDTO) => Promise<void>
  updateProject: (id: number, project: Partial<Project>) => Promise<void>
  deleteProject: (id: number) => Promise<void>
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await api.get<PaginatedResponse>('/projetos');
      // Pegando os projetos do campo content
      const projectsData = response.data.content || [];
      set({ projects: projectsData });
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      set({ projects: [] });
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (projectData: CreateProjectDTO) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post('/projetos', projectData)
      set((state) => ({
        projects: [...state.projects, response.data]
      }))
    } catch (error) {
      set({ error: 'Erro ao criar projeto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  updateProject: async (id: number, projectData: Partial<Project>) => {
    set({ loading: true, error: null })
    try {
      const response = await api.put(`/projetos/${id}`, projectData)
      set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? response.data : p
        )
      }))
    } catch (error) {
      set({ error: 'Erro ao atualizar projeto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  deleteProject: async (id: number) => {
    set({ loading: true, error: null })
    try {
      await api.delete(`/projetos/${id}`)
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      }))
    } catch (error) {
      set({ error: 'Erro ao deletar projeto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
}));
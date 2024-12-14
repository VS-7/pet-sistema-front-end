import { create } from 'zustand'
import api from '@/src/services/api'
import { AssociationType } from '@/src/types'

interface Association {
  id: number
  projetoOrigemId: number
  projetoDestinoId: number
  tipo: AssociationType
  descricao: string
}

interface AssociationStore {
  associations: Association[]
  loading: boolean
  fetchAssociations: () => Promise<void>
  getAssociationById: (id: number) => Promise<Association>
  createAssociation: (association: Omit<Association, 'id'>) => Promise<void>
  deleteAssociation: (id: number) => Promise<void>
}

export const useAssociationStore = create<AssociationStore>((set) => ({
  associations: [],
  loading: false,

  fetchAssociations: async () => {
    set({ loading: true })
    try {
      const response = await api.get('/associacoes')
      set({ associations: response.data })
    } catch (error) {
      throw error
    } finally {
      set({ loading: false })
    }
  },

  getAssociationById: async (id) => {
    try {
      const response = await api.get(`/associacoes/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  createAssociation: async (association) => {
    try {
      const response = await api.post('/associacoes', association)
      set((state) => ({
        associations: [...state.associations, response.data],
      }))
    } catch (error) {
      throw error
    }
  },

  deleteAssociation: async (id) => {
    try {
      await api.delete(`/associacoes/${id}`)
      set((state) => ({
        associations: state.associations.filter((a) => a.id !== id),
      }))
    } catch (error) {
      throw error
    }
  },
})) 
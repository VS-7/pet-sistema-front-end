import { create } from 'zustand'
import api from '@/src/services/api'
import { User } from '@/src/types'

interface UserStore {
  users: User[]
  loading: boolean
  error: string | null
  getUserById: (id: number) => Promise<User | null>
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getUserById: async (id: number) => {
    try {
      set({ loading: true, error: null })
      const response = await api.get(`/usuarios/${id}`)
      return response.data
    } catch (error) {
      set({ error: 'Erro ao buscar usuário' })
      return null
    } finally {
      set({ loading: false })
    }
  },

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null })
      const response = await api.get('/usuarios')
      set({ users: response.data })
    } catch (error) {
      set({ error: 'Erro ao buscar usuários' })
    } finally {
      set({ loading: false })
    }
  },
})) 
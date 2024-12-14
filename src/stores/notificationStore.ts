import { create } from 'zustand'
import api from '@/src/services/api'
import { NotificationType } from '@/src/types'

interface Notification {
  id: number
  usuariosIds: number[]
  titulo: string
  mensagem: string
  tipo: NotificationType
  lida: boolean
  enviarEmail: boolean
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  fetchUserNotifications: (userId: number) => Promise<void>
  getUnreadCount: (userId: number) => Promise<void>
  createNotification: (notification: Omit<Notification, 'id' | 'lida'>) => Promise<void>
  markAsRead: (id: number) => Promise<void>
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchUserNotifications: async (userId) => {
    set({ loading: true })
    try {
      const response = await api.get(`/notificacoes/usuario/${userId}`)
      set({ notifications: response.data })
    } catch (error) {
      throw error
    } finally {
      set({ loading: false })
    }
  },

  getUnreadCount: async (userId) => {
    try {
      const response = await api.get(`/notificacoes/usuario/${userId}/nao-lidas/contagem`)
      set({ unreadCount: response.data })
    } catch (error) {
      throw error
    }
  },

  createNotification: async (notification) => {
    try {
      const response = await api.post('/notificacoes', notification)
      set((state) => ({
        notifications: [...state.notifications, response.data],
      }))
    } catch (error) {
      throw error
    }
  },

  markAsRead: async (id) => {
    try {
      await api.put(`/notificacoes/${id}/marcar-como-lida`)
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, lida: true } : n
        ),
        unreadCount: state.unreadCount - 1,
      }))
    } catch (error) {
      throw error
    }
  },
})) 
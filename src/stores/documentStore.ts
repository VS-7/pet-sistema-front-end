import { create } from 'zustand'
import api from '@/src/services/api'
import { Document } from '@/src/types'


interface DocumentStore {
  documents: Document[]
  loading: boolean
  fetchDocuments: () => Promise<void>
  getDocumentById: (id: number) => Promise<Document>
  createDocument: (document: Omit<Document, 'id'>) => Promise<void>
  updateDocument: (id: number, document: Partial<Document>) => Promise<void>
  deleteDocument: (id: number) => Promise<void>
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  loading: false,

  fetchDocuments: async () => {
    set({ loading: true })
    try {
      const response = await api.get('/documentos')
      set({ documents: response.data })
    } catch (error) {
      throw error
    } finally {
      set({ loading: false })
    }
  },

  getDocumentById: async (id) => {
    try {
      const response = await api.get(`/documentos/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  createDocument: async (document) => {
    try {
      const response = await api.post('/documentos', document)
      set((state) => ({ documents: [...state.documents, response.data] }))
    } catch (error) {
      throw error
    }
  },

  updateDocument: async (id, document) => {
    try {
      const response = await api.put(`/documentos/${id}`, document)
      set((state) => ({
        documents: state.documents.map((doc) => 
          doc.id === id ? response.data : doc
        ),
      }))
    } catch (error) {
      throw error
    }
  },

  deleteDocument: async (id) => {
    try {
      await api.delete(`/documentos/${id}`)
      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== id),
      }))
    } catch (error) {
      throw error
    }
  },
})) 
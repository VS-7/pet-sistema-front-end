import { create } from 'zustand'
import api from '@/src/services/api'

interface Certificate {
  id: number
  projetoId: number
  usuarioId: number
  dataInicioProjeto: Date
  dataFimProjeto: Date
  descricaoAtividades: string
  cargaHoraria: number
}

interface CertificateStore {
  certificates: Certificate[]
  loading: boolean
  getCertificateById: (id: number) => Promise<Certificate>
  createCertificate: (certificate: Omit<Certificate, 'id'>) => Promise<void>
  downloadCertificate: (id: number) => Promise<Blob>
}

export const useCertificateStore = create<CertificateStore>((set) => ({
  certificates: [],
  loading: false,

  getCertificateById: async (id) => {
    try {
      const response = await api.get(`/certificados/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  createCertificate: async (certificate) => {
    try {
      const response = await api.post('/certificados', certificate)
      set((state) => ({
        certificates: [...state.certificates, response.data],
      }))
    } catch (error) {
      throw error
    }
  },

  downloadCertificate: async (id) => {
    try {
      const response = await api.get(`/certificados/${id}/download`, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
})) 
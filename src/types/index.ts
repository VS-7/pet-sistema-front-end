export type DocumentType = 'ENSINO' | 'PESQUISA' | 'EXTENSAO'
export type UserType = 'TUTOR' | 'PETIANO'
export type AssociationType = 'DERIVADO' | 'REFERENCIA' | 'CONTINUACAO' | 'DEPENDENCIA'
export type NotificationType = 
  | 'PROJETO_ATUALIZADO' 
  | 'DOCUMENTO_ADICIONADO' 
  | 'CERTIFICADO_EMITIDO' 
  | 'ASSOCIACAO_CRIADA' 
  | 'MENSAGEM_SISTEMA' 

export type ProjectStatus = 'EM_DESENVOLVIMENTO' | 'CONCLUIDO' | 'CANCELADO' | 'EM_REVISAO'


export type User = {
  id: number
  nome: string
  email: string
  tipo: UserType
}

export type Project = {
  id: number
  titulo: string
  descricao: string
  status: ProjectStatus
  tutor: User
  participantes: User[]
  dataCriacao: string
  dataAtualizacao: string
}

export type CreateProjectDTO = {
  titulo: string
  descricao: string
  status: ProjectStatus
  tutorId: number
  participantesIds: number[]
}

export type Pet = {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  tutor: User;
  membros: User[];
  dataCriacao: string;
  dataAtualizacao?: string;
}

export type PaginatedResponse = {
  content: Project[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
};

export interface Notification {
  id: number
  usuariosIds: number[]
  titulo: string
  mensagem: string
  tipo: NotificationType
  lida: boolean
  enviarEmail: boolean
  dataCriacao: string
}
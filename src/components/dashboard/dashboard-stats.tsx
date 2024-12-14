"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useProjectStore } from "@/src/stores/projectStore"
import { useDocumentStore } from "@/src/stores/documentStore"
import { useCertificateStore } from "@/src/stores/certificateStore"
import { useNotificationStore } from "@/src/stores/notificationStore"
import { FileText, FolderKanban, Medal, Bell } from "lucide-react"

export function DashboardStats() {
  const { projects, fetchProjects } = useProjectStore()
  const { documents, fetchDocuments } = useDocumentStore()
  const { certificates } = useCertificateStore()
  const { unreadCount } = useNotificationStore()

  useEffect(() => {
    fetchProjects()
    fetchDocuments()
  }, [fetchProjects, fetchDocuments])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Projetos Ativos
          </CardTitle>
          <FolderKanban className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Documentos
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{documents.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Certificados Emitidos
          </CardTitle>
          <Medal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{certificates.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Notificações
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unreadCount}</div>
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import { Bell, Plus } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useNotificationStore } from "@/src/stores/notificationStore"
import { useAuthStore } from "@/src/stores/authStore"
import { Badge } from "@/app/components/ui/badge"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DashboardNav() {
  const router = useRouter()
  const user = useAuthStore(state => state.user)
  const { unreadCount, getUnreadCount } = useNotificationStore()

  useEffect(() => {
    if (user) {
      getUnreadCount(user.id)
    }
  }, [user, getUnreadCount])

  return (
    <header className="border-b h-14 px-4 flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => router.push('/projetos/novo')}>
              Novo Projeto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/documentos/novo')}>
              Novo Documento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/certificados/novo')}>
              Novo Certificado
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/associacoes/nova')}>
              Nova Associação
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => router.push('/notificacoes')}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  )
} 
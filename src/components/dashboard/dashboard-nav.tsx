"use client"

import { Bell, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotificationStore } from "@/src/stores/notificationStore"
import { useAuthStore } from "@/src/stores/authStore"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
    <div className="flex h-14 w-full items-center justify-between border-b px-4 lg:px-6">
      {/* Lado esquerdo - Busca */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <div className="flex items-center gap-2 lg:w-64">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Buscar..." 
              className="h-8 w-full bg-background"
            />
          </div>
        </div>
      </div>

      {/* Lado direito - Ações */}
      <div className="flex items-center gap-4">
        {/* Botão Novo */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
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

        {/* Botão móvel Novo */}
        <Button size="icon" variant="ghost" className="md:hidden">
          <Plus className="h-5 w-5" />
        </Button>

        {/* Notificações */}
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
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
} 
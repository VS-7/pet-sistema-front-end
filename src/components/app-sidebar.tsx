"use client"

import * as React from "react"
import {
  FileText,
  FolderKanban,
  Home,
  Link2,
  Medal,
  Settings,
  Bell,
  Users,
} from "lucide-react"
import { NavMain } from "@/src/components/nav-main"
import { NavUser } from "@/src/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/components/ui/sidebar"
import { useAuthStore } from "@/src/stores/authStore"

const getNavItems = (userType: 'TUTOR' | 'PETIANO') => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Projetos",
      url: "/projetos",
      icon: FolderKanban,
      items: [
        {
          title: "Meus Projetos",
          url: "/projetos/meus",
        },
        {
          title: "Todos os Projetos",
          url: "/projetos/todos",
        },
      ],
    },
    {
      title: "Documentos",
      url: "/documentos",
      icon: FileText,
      items: [
        {
          title: "Ensino",
          url: "/documentos/ensino",
        },
        {
          title: "Pesquisa",
          url: "/documentos/pesquisa",
        },
        {
          title: "Extensão",
          url: "/documentos/extensao",
        },
      ],
    },
    {
      title: "Certificados",
      url: "/certificados",
      icon: Medal,
    },
    {
      title: "Associações",
      url: "/associacoes",
      icon: Link2,
    },
  ]

  // Adiciona itens específicos para TUTOR
  if (userType === 'TUTOR') {
    baseItems.push({
      title: "Gerenciar Usuários",
      url: "/usuarios",
      icon: Users,
    })
  }

  return baseItems
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore(state => state.user)

  if (!user) return null

  const navItems = getNavItems(user.tipo)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">PET Manager</h2>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={{
            name: user.nome,
            email: user.email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user.nome}`,
          }} 
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 
import { Button } from "@/components/ui/button"
import { FolderIcon } from "lucide-react"
import Link from "next/link"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"

// Simulando dados de projetos recentes
const recentProjects = [
  { id: 1, name: "Projeto de Extensão 2024" },
  { id: 2, name: "Pesquisa em IA" },
  { id: 3, name: "Workshop de Programação" },
  { id: 4, name: "Iniciação Científica" },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Projetos Recentes</h2>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-1">
          {recentProjects.map((project) => (
            <Link key={project.id} href={`/projetos/${project.id}`}>
              <Button variant="ghost" className="w-full justify-start">
                <span className="truncate">{project.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
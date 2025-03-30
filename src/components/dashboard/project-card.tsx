import { Project } from "@/src/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useProjectStore } from "@/src/stores/projectStore"
import { useEffect, useState } from "react"
import { User } from "@/src/types"
import Link from "next/link"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { getProjectById } = useProjectStore()
  const [participantes, setParticipantes] = useState<User[]>([])

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const users = await getProjectById(project.id)
        setParticipantes(users.participantes)
      } catch (error) {
        console.error('Erro ao carregar participantes:', error)
      }
    }

    loadParticipants()
  }, [project.id, getProjectById])

  return (
    <Link href={`/projetos/${project.id}`}>
      <Card className="w-full border border-zinc-200 rounded-lg shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-500 font-medium mb-1">{project.status}</div>
            <div className="text-xs text-zinc-500">{new Date(project.dataCriacao).toLocaleDateString()}</div>
          </div>
          <h3 className="text-lg font-semibold text-zinc-800">{project.titulo}</h3>
          <p className="text-sm text-zinc-600 line-clamp-2 mt-1">
            {project.descricao}
          </p>
        </CardHeader>
        <CardContent className="border-t border-zinc-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-zinc-200 text-zinc-600">
                  {participantes[0]?.nome[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-zinc-600">{participantes[0]?.nome}</span>
            </div>

          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
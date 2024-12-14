"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useProjectStore } from "@/src/stores/projectStore"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"

export function RecentProjects() {
  const router = useRouter()
  const { projects, fetchProjects } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {projects.slice(0, 5).map((project) => (
          <Button
            key={project.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => router.push(`/projetos/${project.id}`)}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{project.titulo}</span>
              <span className="text-sm text-muted-foreground">
                {project.descricao.substring(0, 50)}...
              </span>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
} 
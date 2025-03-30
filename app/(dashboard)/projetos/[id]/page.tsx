'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useProjectStore } from "@/src/stores/projectStore"
import { Project } from "@/src/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DocumentForm } from "@/src/components/documents/document-form"

export default function ProjectPage() {
  const params = useParams()
  const projectId = Number(params.id)
  const { getProjectById } = useProjectStore()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const projectData = await getProjectById(projectId)
        setProject(projectData)
      } catch (error) {
        console.error('Erro ao carregar dados do projeto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjectData()
  }, [projectId, getProjectById])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p>Projeto não encontrado</p>
        <Link href="/dashboard">
          <Button variant="outline">Voltar para Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.titulo}</h1>
          <p className="text-sm text-zinc-500">
            Criado em {new Date(project.dataCriacao).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline">Voltar</Button>
          </Link>
          <Button>Editar Projeto</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600">{project.descricao}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {project.status}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <DocumentForm projectId={project.id} />
      </div>
    </div>
  )
}
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { useProjectStore } from "@/src/stores/projectStore"

export function ProjectsSection() {
    const { projects, loading, fetchProjects } = useProjectStore()
  
    useEffect(() => {
      fetchProjects()
    }, [fetchProjects])
  
    // Garantir que projects é um array
    const projectsList = Array.isArray(projects) ? projects : []
  
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Projetos do Grupo</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Carregando projetos...</div>
          ) : (
            <div className="space-y-4">
              {projectsList.map(project => (
                <div 
                  key={project.id} 
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{project.titulo}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'EM_ANDAMENTO' 
                        ? 'bg-blue-100 text-blue-700'
                        : project.status === 'CONCLUIDO'
                        ? 'bg-green-100 text-green-700'
                        : project.status === 'SUSPENSO'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{project.descricao}</p>
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <span>Tutor: {project.tutor.nome}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-400">
                      Criado em: {new Date(project.dataCriacao).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {project.participantes.length} participante(s)
                    </div>
                  </div>
                </div>
              ))}
              {projectsList.length === 0 && !loading && (
                <div className="text-center text-gray-500 py-4">
                  Nenhum projeto encontrado
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
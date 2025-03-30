'use client'

import { useEffect } from "react"
import { useDocumentStore } from "@/src/stores/documentStore"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DocumentListProps {
  projectId: number
}

export function DocumentList({ projectId }: DocumentListProps) {
  const { documents, fetchDocuments } = useDocumentStore()

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos do Projeto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.map((doc) => (
            <Link 
              key={doc.id} 
              href={`/documentos/${doc.id}`}
              className="block p-3 hover:bg-zinc-50 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{doc.titulo}</h3>
                  <p className="text-sm text-zinc-500">{doc.tipo}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
'use client'

import { useState, useRef } from "react"
import { useDocumentStore } from "@/src/stores/documentStore"
import { DocumentType } from "@/src/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface DocumentFormProps {
  projectId: number
  onSuccess?: () => void
}

export function DocumentForm({ projectId, onSuccess }: DocumentFormProps) {
  const { createDocument } = useDocumentStore()
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const documentData = {
      projetoId: projectId,
      titulo: formData.get('titulo') as string,
      tipo: formData.get('tipo') as DocumentType,
      conteudo: formData.get('conteudo'),
    }

    try {
      await createDocument(documentData)
      formRef.current?.reset()
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao criar documento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Documento</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="titulo"
              placeholder="Título do documento"
              required
            />
          </div>

          <div>
            <Select name="tipo" required>
              <SelectTrigger>
                <SelectValue placeholder="Tipo do documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENSINO">Ensino</SelectItem>
                <SelectItem value="PESQUISA">Pesquisa</SelectItem>
                <SelectItem value="EXTENSAO">Extensão</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Textarea
              name="conteudo"
              placeholder="Conteúdo do documento"
              required
              rows={5}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Documento'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 
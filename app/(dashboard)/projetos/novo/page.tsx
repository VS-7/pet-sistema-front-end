"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProjectStore } from "@/src/stores/projectStore"
import { useAuthStore } from "@/src/stores/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectStatus } from "@/src/types"
export default function NewProjectPage() {
  const router = useRouter()
  const { createProject, loading, error } = useProjectStore()
  const { user } = useAuthStore()

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    status: "EM_DESENVOLVIMENTO",
    participantesIds: [] as number[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!user?.id) throw new Error("Usuário não encontrado")
      
      await createProject({
        ...formData,
        tutorId: user.id,
        status: formData.status as ProjectStatus,
      })
      router.push("/projetos")
    } catch (error) {
      console.error("Erro ao criar projeto:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Novo Projeto</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                required
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                required
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as any })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EM_DESENVOLVIMENTO">
                    Em Desenvolvimento
                  </SelectItem>
                  <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                  <SelectItem value="CANCELADO">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Criando..." : "Criar Projeto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
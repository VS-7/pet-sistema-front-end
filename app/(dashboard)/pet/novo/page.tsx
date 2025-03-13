"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/stores/authStore"
import { usePetStore } from "@/src/stores/petStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function NewPetPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { createPet, loading, error } = usePetStore()

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    descricao: "",
  })

  // Verifica se o usuário é tutor
  if (user?.tipo !== "TUTOR") {
    router.push("/dashboard")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPet({
        ...formData,
        tutorId: user!.id,
      })
      toast({
        title: "Sucesso",
        description: "Grupo PET criado com sucesso!",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar grupo PET",
        variant: "destructive",
      })
      console.error("Erro ao criar grupo PET:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Criar Novo Grupo PET</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Grupo PET</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Grupo</label>
              <Input
                required
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Ex: PET Computação"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Código do Grupo</label>
              <Input
                required
                value={formData.codigo}
                onChange={(e) =>
                  setFormData({ ...formData, codigo: e.target.value })
                }
                placeholder="Ex: PET-COMP-UFES"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Descreva o grupo PET..."
              />
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
                {loading ? "Criando..." : "Criar Grupo PET"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
'use client'

import { useState } from "react"
import { Pet } from "@/src/types/"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { usePetStore } from "@/src/stores/petStore"
import { toast } from "@/hooks/use-toast"

interface PetInfoTabProps {
  pet: Pet
}

export function PetInfoTab({ pet }: PetInfoTabProps) {
  const { updatePet } = usePetStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nome: pet.nome,
    codigo: pet.codigo,
    descricao: pet.descricao,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updatePet(pet.id, formData)
      toast({
        title: "Sucesso",
        description: "Informações atualizadas com sucesso!",
      })
      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao atualizar informações",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isEditing) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Nome do Grupo</h3>
            <p>{pet.nome}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Código</h3>
            <p>{pet.codigo}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Descrição</h3>
            <p className="whitespace-pre-wrap">{pet.descricao}</p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            Editar Informações
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Grupo</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 
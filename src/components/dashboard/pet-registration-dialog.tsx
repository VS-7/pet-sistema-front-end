'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { usePetStore } from "@/src/stores/petStore"

interface PetRegistrationDialogProps {
  open: boolean
  tutorId: number
  onSuccess: () => void
}

export function PetRegistrationDialog({ open, tutorId, onSuccess }: PetRegistrationDialogProps) {
  const { createPet, fetchPets } = usePetStore()
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    descricao: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await createPet({
        ...formData,
        tutorId,
      })
      toast({
        title: "Sucesso",
        description: "Grupo PET criado com sucesso!",
      })
      await fetchPets()
      onSuccess()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao criar grupo PET",
        variant: "destructive",
      })
      console.error("Erro ao criar grupo PET:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Cadastro do Grupo PET</DialogTitle>
          <DialogDescription>
            Preencha as informações do seu grupo PET para continuar.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Grupo</Label>
            <Input
              id="nome"
              required
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              placeholder="Ex: PET Computação"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              placeholder="Descreva o grupo PET..."
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando..." : "Criar Grupo PET"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
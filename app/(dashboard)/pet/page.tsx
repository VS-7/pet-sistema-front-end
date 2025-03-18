'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/stores/authStore"
import { usePetStore } from "@/src/stores/petStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PetInfoTab } from "@/src/components/pet/pet-info-tab"
import { PetMembersTab } from "@/src/components/pet/pet-members-tab"

export default function PetPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { pets, loading, fetchPets } = usePetStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchPets()
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [fetchPets])

  // Verifica acesso e redireciona se necessário
  useEffect(() => {
    if (!isLoading && (!user || user.tipo !== "TUTOR" || pets.length === 0)) {
      router.push('/dashboard')
    }
  }, [user, pets, isLoading, router])

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!user || user.tipo !== "TUTOR" || pets.length === 0) {
    return null
  }

  const pet = pets[0] // Assumindo que o tutor só tem um PET

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{pet.nome}</h1>
        <p className="text-sm text-muted-foreground">Código: {pet.codigo}</p>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="members">Petianos</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <PetInfoTab pet={pet} />
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <PetMembersTab pet={pet} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 
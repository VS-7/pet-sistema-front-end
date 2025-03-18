'use client'

import { useEffect, useState } from "react"
import { ProfileCard } from "@/src/components/profile/profile-card"
import { useAuthStore } from "@/src/stores/authStore"
import { usePetStore } from "@/src/stores/petStore"
import { WelcomeDialog } from "@/src/components/dashboard/welcome-dialog"
import { PetRegistrationDialog } from "@/src/components/dashboard/pet-registration-dialog"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { pets, loading, fetchPets } = usePetStore()
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const loadPets = async () => {
      try {
        await fetchPets()
      } catch (error) {
        console.error('Erro ao carregar pets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.tipo === "TUTOR") {
      loadPets()
    } else {
      setIsLoading(false)
    }
  }, [user, fetchPets])

  // Aguarda o carregamento inicial
  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!user) return null

  const needsPetRegistration = user.tipo === "TUTOR" && pets.length === 0

  return (
    <>
      <WelcomeDialog 
        open={needsPetRegistration && !showForm}
        onProceed={() => setShowForm(true)}
      />

      <PetRegistrationDialog
        open={needsPetRegistration && showForm}
        tutorId={user.id}
        onSuccess={() => setShowForm(false)}
      />

      {/* Dashboard normal */}
      <div className="space-y-6">
        <div className="p-6">
          <ProfileCard />
        </div>
        {/* Adicione aqui os outros componentes do dashboard */}
      </div>
    </>
  )
}

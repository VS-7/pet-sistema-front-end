'use client'

import { useEffect, useState } from "react"
import { ProfileCard } from "@/src/components/profile/profile-card"
import { useAuthStore } from "@/src/stores/authStore"
import { usePetStore } from "@/src/stores/petStore"
import { WelcomeDialog } from "@/src/components/dashboard/welcome-dialog"
import { PetRegistrationDialog } from "@/src/components/dashboard/pet-registration-dialog"
import { ProjectCard } from "@/src/components/dashboard/project-card"
import { useProjectStore } from "@/src/stores/projectStore"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { pets, loading: petsLoading, fetchPets } = usePetStore()
  const { projects, loading: projectsLoading, fetchProjects } = useProjectStore()
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user?.tipo === "TUTOR") {
          await Promise.all([fetchPets(), fetchProjects()])
        } else {
          await fetchProjects()
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user, fetchPets, fetchProjects])

  if (isLoading || petsLoading || projectsLoading) {
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

      <div >
        <div className="flex flex-col md:flex-row gap-4">
          <div className=" flex-shrink-0">
            <ProfileCard />
          </div>
          
          <div className="flex-1">
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 xl:grid-cols-1">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

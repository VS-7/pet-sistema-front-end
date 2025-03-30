'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuthStore } from "@/src/stores/authStore"
import { useUserStore } from "@/src/stores/userStore"
import { User } from "@/src/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const params = useParams()
  const userId = Number(params.id)
  const { user: currentUser } = useAuthStore()
  const { getUserById } = useUserStore()
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserById(userId)
        setProfileUser(userData)
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [userId, getUserById])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Usuário não encontrado</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              {profileUser.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profileUser.nome}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {profileUser.tipo === 'TUTOR' ? 'Tutor' : 'Petiano'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
              <p>{profileUser.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">PET ID</h3>
              <p>{profileUser.petId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuthStore } from "@/src/stores/authStore"
import { Building2, GraduationCap, Mail, User2 } from "lucide-react"
import Link from "next/link"

export function ProfileCard() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <Card className="overflow-hidden rounded-x bg-card">
      <div className="h-16 bg-primary" />
      <CardHeader className="relative">
        <div className="absolute -top-10 left-4">
          <Avatar className="h-16 w-16 border-4 border-white">
            <AvatarImage src="" alt={user.nome} />
            <AvatarFallback className="text-xl">{user.nome[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div >
          <h2 className="text-lg font-semibold">{user.nome}</h2>
          <p className="text-xs text-muted-foreground">
            {user.tipo === 'TUTOR' ? 'Tutor(a)' : 'Petiano(a)'}
          </p>
          <Link 
            href={`/perfil/${user.id}`} 
            className="text-xs text-blue-600 hover:underline dark:text-blue-400"
          >
            Ver perfil
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>Instituto Federal do Sudeste de Minas</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{user.pet}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
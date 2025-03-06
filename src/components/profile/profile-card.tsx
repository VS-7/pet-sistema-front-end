import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuthStore } from "@/src/stores/authStore"
import { Building2, GraduationCap, Mail } from "lucide-react"

export function ProfileCard() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <Card className="max-w-[250px] overflow-hidden rounded-xl dark:bg-gray-900">
      <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-400" />
      <CardHeader className="relative">
        <div className="absolute -top-12 left-4">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarImage src="" alt={user.nome} />
            <AvatarFallback className="text-2xl">{user.nome[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="pt-5">
          <h2 className="text-xl font-semibold">{user.nome}</h2>
          <p className="text-sm text-muted-foreground">
            {user.tipo === 'TUTOR' ? 'Tutor(a)' : 'Petiano(a)'}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>Instituto Federal do Sudeste de Minas</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>Grupo PET Conexões de Saberes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
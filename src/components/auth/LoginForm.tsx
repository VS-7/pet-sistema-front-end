'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/src/stores/authStore'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const login = useAuthStore(state => state.login)
  const { toast } = useToast()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login(email, password)
      
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.response?.data?.message || "Ocorreu um erro ao tentar fazer login",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full p-4">
      {/* Lado esquerdo - Imagem com gradiente */}
      <div className="hidden md:flex md:w-1/2 rounded-3xl relative bg-gradient-to-b from-blue-600 to-blue-500">
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-white text-2xl font-bold">
            PET Docs
          </Link>
        </div>
        <div className="flex flex-col justify-center h-full w-full max-w-xl mx-auto px-12 text-white">
          <h2 className="text-5xl font-bold mb-4">
            Simplificando a Gestão
            <br />
            de Documentos PET
          </h2>
          <div className="flex gap-2 mt-8">
            <div className="w-8 h-2 bg-white/50 rounded-full" />
            <div className="w-8 h-2 bg-white rounded-full" />
            <div className="w-8 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Login</h1>
            <Link 
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Voltar ao site
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 w-full bg-gray-50 border-gray-200"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-gray-700">Senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 w-full bg-gray-50 border-gray-200"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

         
        </div>
      </div>
    </div>
  )
} 
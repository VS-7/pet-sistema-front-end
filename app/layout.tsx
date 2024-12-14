import './globals.css'
import { Inter } from 'next/font/google'
import { AuthGuard } from '@/src/components/auth/auth-guard'
import { ThemeProvider } from '@/src/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PET Manager',
  description: 'Sistema de Gerenciamento de Projetos PET',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}
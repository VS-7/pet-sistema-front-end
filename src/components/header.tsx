import { Button } from "@/components/ui/button"
import { 
  BellIcon, 
  SearchIcon, 
  MenuIcon,
  HomeIcon, 
  FolderIcon, 
  FileTextIcon, 
  AwardIcon,
  NetworkIcon,
  ActivityIcon,
  SunIcon,
  MoonIcon 
} from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuthStore } from '@/src/stores/authStore'
import { useThemeStore } from '@/src/stores/themeStore'

export function Header() {
  const { user } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="border-b h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-48">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="space-y-2 mt-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/projetos">
                <Button variant="ghost" className="w-full justify-start">
                  <FolderIcon className="mr-2 h-4 w-4" />
                  Projetos
                </Button>
              </Link>
              <Link href="/documentos">
                <Button variant="ghost" className="w-full justify-start">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Documentos
                </Button>
              </Link>
              <Link href="/certificados">
                <Button variant="ghost" className="w-full justify-start">
                  <AwardIcon className="mr-2 h-4 w-4" />
                  Certificados
                </Button>
              </Link>
              <Link href="/associacoes">
                <Button variant="ghost" className="w-full justify-start">
                  <NetworkIcon className="mr-2 h-4 w-4" />
                  Associações
                </Button>
              </Link>
              <Link href="/notificacoes">
                <Button variant="ghost" className="w-full justify-start">
                  <BellIcon className="mr-2 h-4 w-4" />
                  Notificações
                </Button>
              </Link>
              <Link href="/logs">
                <Button variant="ghost" className="w-full justify-start">
                  <ActivityIcon className="mr-2 h-4 w-4" />
                  Logs
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="font-semibold text-lg">
          PET Manager
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <h2>{user?.nome}</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full overflow-hidden"
        >
          <img
            src="https://github.com/shadcn.png"
            alt="Avatar"
            className="h-8 w-8"
          />
        </Button>
      </div>
    </header>
  )
} 
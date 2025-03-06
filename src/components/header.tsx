import { Button } from "@/components/ui/button"
import { 
  BellIcon, 
  SearchIcon, 
  HomeIcon, 
  FolderIcon,  
  NetworkIcon,
  SunIcon,
  MoonIcon 
} from "lucide-react"
import Link from "next/link"
import { useThemeStore } from '@/src/stores/themeStore'

export function Header() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="border-b h-14 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-[1128px] mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="font-semibold text-xl mr-4">
            PET 
          </Link>
          
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 h-4 w-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Pesquisar"
              className="h-9 w-[280px] rounded-md bg-gray-100 dark:bg-gray-800 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 min-w-[80px]">
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs">Início</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 min-w-[80px]">
              <NetworkIcon className="h-5 w-5" />
              <span className="text-xs">Rede</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 min-w-[80px]">
              <FolderIcon className="h-5 w-5" />
              <span className="text-xs">Projetos</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 min-w-[80px]">
            <BellIcon className="h-5 w-5" />
            <span className="text-xs">Notificações</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 min-w-[80px]">
            <img
              src="https://github.com/shadcn.png"
              alt="Avatar"
              className="h-6 w-6 rounded-full"
            />
            <span className="text-xs">Você</span>
          </Button>

          <div className="h-8 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2" />

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
} 
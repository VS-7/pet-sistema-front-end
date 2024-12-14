import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

export function Breadcrumb() {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Link href="/dashboard" className="hover:text-foreground">
        Dashboard
      </Link>
      <ChevronRightIcon className="h-4 w-4 mx-1" />
      <span className="text-foreground">Página Atual</span>
    </div>
  )
} 
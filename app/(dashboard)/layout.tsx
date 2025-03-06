"use client"

import { Header } from "@/src/components/header"
import { AppSidebar } from "@/src/components/app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        {/*{!isMobile && <AppSidebar />}*/}
        <main className="flex-1">
          <div className="mx-auto max-w-[1300px] px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
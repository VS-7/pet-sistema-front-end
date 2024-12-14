import { AppSidebar } from "@/src/components/app-sidebar"
import { DashboardNav } from "@/src/components/dashboard/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <div className="sidebar-wrapper">
        <AppSidebar />
      </div>
      <div className="dashboard-main">
        <div className="navbar">
          <DashboardNav />
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  )
} 
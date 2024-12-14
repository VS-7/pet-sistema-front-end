import { AppSidebar } from "@/src/components/app-sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <div className="navbar">
         
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  )
} 
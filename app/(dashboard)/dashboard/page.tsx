import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { RecentProjects } from "@/src/components/dashboard/recent-projects"
import { RecentActivities } from "@/src/components/dashboard/recent-activities"
import { DashboardStats } from "@/src/components/dashboard/dashboard-stats"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Projetos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProjects />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
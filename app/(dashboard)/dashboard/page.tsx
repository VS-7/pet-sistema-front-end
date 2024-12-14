import { ProjectsSection } from "@/src/components/dashboard/projects-section"
import { NewsSection } from "@/src/components/dashboard/news-section"


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Home</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <ProjectsSection />
        {/*<NewsSection />*/}
      </div>
    </div>
  )
}

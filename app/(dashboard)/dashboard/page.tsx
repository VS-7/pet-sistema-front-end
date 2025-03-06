'use client'

import { ProjectsSection } from "@/src/components/dashboard/projects-section"
import { NewsSection } from "@/src/components/dashboard/news-section"
import { ProfileCard } from "@/src/components/profile/profile-card"
import { useAuthStore } from "@/src/stores/authStore"

export default function DashboardPage() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="p-6">
        <ProfileCard />
      </div>
    </div>
  )
}

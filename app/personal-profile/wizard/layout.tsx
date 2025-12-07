import type { ReactNode } from "react"
import { ProfileProgressComponent } from "@/components/profile/ProfileProgress"

export default function WizardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <ProfileProgressComponent variant="compact" />
        </div>
        {children}
      </div>
    </div>
  )
}

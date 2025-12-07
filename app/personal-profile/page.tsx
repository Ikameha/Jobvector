"use client"

import { useState, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Briefcase } from "lucide-react"
import Link from "next/link"
import { ProfileProgressComponent } from "@/components/profile/ProfileProgress"
import { loadProfile, saveProfile } from "@/lib/storage"
import { Profile } from "@/lib/types"
import { ProfileForm } from "@/components/profile/ProfileForm"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const existing = loadProfile()
    setProfile(existing)
    if (!existing) {
      setShowForm(true)
    }
  }, [])

  const handleSaveProfile = (newProfile: Profile) => {
    saveProfile(newProfile)
    setProfile(newProfile)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Your Profile
              </h1>
              <p className="text-muted-foreground mt-0.5">Refine your profile to get better job matches</p>
            </div>
          </div>
          <ProfileProgressComponent variant="full" />
        </div>

        {/* Builder Cards - Always visible for refining */}
        <div className="grid gap-6 mb-8">
          <Card className="p-6 border-2 border-secondary/20 bg-secondary/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Quick Profile Builder
                </h3>
                <p className="text-sm text-muted-foreground">
                  Answer 5 quick questions to refine your profile in under 2 minutes
                </p>
              </div>
              <Link href="/personal-profile/build">
                <Button variant="neon" className="gap-2 whitespace-nowrap">
                  <Sparkles className="h-4 w-4" />
                  Start Builder
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 border-2 border-chart-3/20 bg-chart-3/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-chart-3" />
                  Upload Your CV
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update your profile by uploading a new CV
                </p>
              </div>
              <Link href="/personal-profile/upload">
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                  <Sparkles className="h-4 w-4" />
                  Upload CV
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 border-2 border-primary/20 bg-primary/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Detailed Profile Wizard
                </h3>
                <p className="text-sm text-muted-foreground">
                  Go through the detailed wizard to fine-tune your preferences
                </p>
              </div>
              <Link href="/personal-profile/wizard">
                <Button className="gap-2 whitespace-nowrap">
                  <Sparkles className="h-4 w-4" />
                  Start Wizard
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Show Form ONLY if no profile exists */}
        {!profile && showForm && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
            <ProfileForm onSave={handleSaveProfile} />
          </div>
        )}

        {/* If profile exists, show a link to dashboard for details */}
        {profile && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Want to view or edit your full profile details?
            </p>
            <Link href="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

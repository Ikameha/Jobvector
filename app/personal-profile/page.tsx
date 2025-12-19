"use client"

import { useState, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Briefcase, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { loadProfile, saveProfile } from "@/lib/storage"
import { Profile } from "@/lib/types"
import { ProfileDetails } from "@/components/profile/ProfileDetails"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { ProfileProgressComponent } from "@/components/profile/ProfileProgress"
import { PageTransition } from "@/components/ui/page-transition"
import { AsymmetricalBackground } from "@/components/ui/asymmetrical-background"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const existing = loadProfile()
    setProfile(existing)
  }, [])

  const handleSaveProfile = (updatedProfile: Profile) => {
    saveProfile(updatedProfile)
    setProfile(updatedProfile)
    setIsEditing(false)
  }

  return (
    <PageTransition className="min-h-screen">
      <AsymmetricalBackground />
      <AppNav />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Unified Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              {profile ? (
                <>
                  <h1 className="text-3xl font-bold tracking-tight">{profile.name || "User"}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <span className="capitalize font-medium text-foreground">{profile.experienceLevel}</span>
                    <span>•</span>
                    <span>{profile.yearsOfExperience} years exp.</span>
                  </div>
                </>
              ) : (
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
              )}
            </div>
          </div>

          <Link href="/quiz">
            <Button variant="outline" className="gap-2 h-10">
              <Sparkles className="w-4 h-4 text-primary" />
              Enhance with AI
            </Button>
          </Link>
        </div>

        {/* Profile Power Progress */}
        <div className="mb-10">
          <ProfileProgressComponent variant="full" />
        </div>

        {/* Profile Content */}
        {profile ? (
          isEditing ? (
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
              </div>
              <ProfileForm
                initialProfile={profile}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <ProfileDetails
              profile={profile}
              onEdit={() => setIsEditing(true)}
            />
          )
        ) : (
          <div className="text-center py-20 bg-muted/10 rounded-xl border border-border border-dashed">
            <User className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Profile Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't created your profile yet. Start by answering a few questions to get personalized job matches.
            </p>
            <Link href="/quiz">
              <Button variant="neon" size="lg">
                Create Profile
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

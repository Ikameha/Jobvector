"use client"

import { useState, useEffect } from "react"
import { AppNav } from "@/components/app-nav"
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { ProfileRadarChart } from "@/components/profile/ProfileRadarChart"
import { ProfileDetails } from "@/components/profile/ProfileDetails"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { loadProfile, saveProfile } from "@/lib/storage"
import { Profile } from "@/lib/types"

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  useEffect(() => {
    setProfile(loadProfile())
  }, [])

  const handleSaveProfile = (updatedProfile: Profile) => {
    saveProfile(updatedProfile)
    setProfile(updatedProfile)
    setIsEditingProfile(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.name.split(' ')[0] || 'Guest'}</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your job search today.
            </p>
          </div>
          <Link href="/jobs">
            <Button variant="neon" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Find New Matches
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-secondary/10 border border-secondary/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <DashboardMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">

                {/* Recommended Jobs Preview */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Top Recommendations</h2>
                    <Link href="/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
                      View All <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid gap-4">
                    {/* Placeholder Job Cards */}
                    {[1, 2, 3].map((i) => (
                      <GlassCard key={i} intensity="light" className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                              TC
                            </div>
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">Senior Frontend Engineer</h3>
                              <p className="text-sm text-muted-foreground">TechCorp • Remote • $120k - $150k</p>
                              <div className="flex gap-2 mt-2">
                                <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">React</span>
                                <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">TypeScript</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-500">9{8 - i}%</div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Profile Radar Chart */}
                <ProfileRadarChart />

                {/* Recent Activity */}
                <RecentActivity />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            {profile ? (
              isEditingProfile ? (
                <ProfileForm
                  initialProfile={profile}
                  onSave={handleSaveProfile}
                  onCancel={() => setIsEditingProfile(false)}
                />
              ) : (
                <ProfileDetails
                  profile={profile}
                  onEdit={() => setIsEditingProfile(true)}
                />
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't created a profile yet.</p>
                <Link href="/personal-profile">
                  <Button>Create Profile</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

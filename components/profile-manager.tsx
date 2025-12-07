"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Profile, ExperienceLevel, WorkMode, CompanyType } from "@/lib/types"
import { saveProfile, loadProfile } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Briefcase, Sparkles, CheckCircle2 } from "lucide-react"

export default function ProfileManager() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showSavedFeedback, setShowSavedFeedback] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("mid")
  const [yearsOfExperience, setYearsOfExperience] = useState(3)
  const [locationPreferences, setLocationPreferences] = useState<string[]>([])
  const [locationInput, setLocationInput] = useState("")
  const [workModePreferences, setWorkModePreferences] = useState<WorkMode[]>(["remote"])
  const [salaryMin, setSalaryMin] = useState(80000)
  const [salaryMax, setSalaryMax] = useState(120000)
  const [companyTypePreferences, setCompanyTypePreferences] = useState<CompanyType[]>(["startup"])
  const [culturalValues, setCulturalValues] = useState<string[]>([])
  const [valueInput, setValueInput] = useState("")

  useEffect(() => {
    const existing = loadProfile()
    if (existing) {
      setProfile(existing)
      populateForm(existing)
    } else {
      setIsEditing(true)
    }
  }, [])

  const populateForm = (p: Profile) => {
    setName(p.name)
    setSkills(p.skills)
    setExperienceLevel(p.experienceLevel)
    setYearsOfExperience(p.yearsOfExperience)
    setLocationPreferences(p.locationPreferences)
    setWorkModePreferences(p.workModePreferences)
    setSalaryMin(p.salaryMin)
    setSalaryMax(p.salaryMax)
    setCompanyTypePreferences(p.companyTypePreferences)
    setCulturalValues(p.culturalValues)
  }

  const handleSave = () => {
    const newProfile: Profile = {
      id: profile?.id || `profile-${Date.now()}`,
      userId: "user-1", // Placeholder for now
      name,
      skills,
      experienceLevel,
      yearsOfExperience,
      locationPreferences,
      workModePreferences,
      salaryMin,
      salaryMax,
      companyTypePreferences,
      culturalValues,
      createdAt: profile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveProfile(newProfile)
    setProfile(newProfile)
    setIsEditing(false)
    setShowSavedFeedback(true)
    setTimeout(() => setShowSavedFeedback(false), 3000)
  }

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const addLocation = () => {
    if (locationInput.trim() && !locationPreferences.includes(locationInput.trim())) {
      setLocationPreferences([...locationPreferences, locationInput.trim()])
      setLocationInput("")
    }
  }

  const removeLocation = (location: string) => {
    setLocationPreferences(locationPreferences.filter((l) => l !== location))
  }

  const addValue = () => {
    if (valueInput.trim() && !culturalValues.includes(valueInput.trim())) {
      setCulturalValues([...culturalValues, valueInput.trim()])
      setValueInput("")
    }
  }

  const removeValue = (value: string) => {
    setCulturalValues(culturalValues.filter((v) => v !== value))
  }

  const toggleWorkMode = (mode: WorkMode) => {
    if (workModePreferences.includes(mode)) {
      setWorkModePreferences(workModePreferences.filter((m) => m !== mode))
    } else {
      setWorkModePreferences([...workModePreferences, mode])
    }
  }

  const toggleCompanyType = (type: CompanyType) => {
    if (companyTypePreferences.includes(type)) {
      setCompanyTypePreferences(companyTypePreferences.filter((t) => t !== type))
    } else {
      setCompanyTypePreferences([...companyTypePreferences, type])
    }
  }

  if (!isEditing && profile) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Your Profile
                </h1>
                <p className="text-muted-foreground mt-0.5">Complete job matching profile</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push("/jobs")} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Browse Jobs
              </Button>
            </div>
          </div>
          {showSavedFeedback && (
            <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Profile saved successfully!</p>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription className="text-base flex items-center gap-2">
                    <Badge variant="outline" className="font-medium">
                      {profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}
                    </Badge>
                    <span>•</span>
                    <span>{profile.yearsOfExperience} years experience</span>
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills & Expertise</CardTitle>
                <CardDescription>Your technical competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultural Values */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cultural Values</CardTitle>
                <CardDescription>What matters most to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.culturalValues.map((value) => (
                    <Badge key={value} variant="outline" className="px-3 py-1">
                      {value}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Work Preferences</CardTitle>
                <CardDescription>Preferred work arrangements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Work Mode</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.workModePreferences.map((mode) => (
                      <Badge key={mode} className="capitalize">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Company Types</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.companyTypePreferences.map((type) => (
                      <Badge key={type} variant="secondary" className="capitalize">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Salary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Location & Compensation</CardTitle>
                <CardDescription>Where and how much</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Preferred Locations</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.locationPreferences.map((location) => (
                      <Badge key={location} variant="outline">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Salary Range</p>
                  <p className="text-lg font-semibold">
                    ${profile.salaryMin.toLocaleString()} - ${profile.salaryMax.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {profile ? "Edit Your Profile" : "Create Your Profile"}
            </h1>
            <p className="text-muted-foreground mt-0.5">Help us match you with the perfect opportunities</p>
          </div>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Tell us about your skills, preferences, and what you're looking for in your next role.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Basic Information</h3>
            <div>
              <Label htmlFor="name">Profile Name</Label>
              <Input
                id="name"
                placeholder="e.g., Senior Frontend Engineer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1.5">Give your profile a descriptive name</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <select
                  id="experienceLevel"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid-Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <div>
                <Label htmlFor="years">Years of Experience</Label>
                <Input
                  id="years"
                  type="number"
                  min="0"
                  max="50"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Skills & Expertise</h3>
            <div>
              <Label>Technical Skills</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  placeholder="Add a skill (e.g., React, TypeScript, Python)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" size="icon" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 min-h-[2rem]">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1 pl-3 pr-1 py-1.5">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive rounded-sm p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet</p>}
              </div>
            </div>

            <div>
              <Label>Cultural Values</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  placeholder="What matters to you? (e.g., work-life balance, innovation)"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addValue())}
                />
                <Button type="button" size="icon" onClick={addValue}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 min-h-[2rem]">
                {culturalValues.map((value) => (
                  <Badge key={value} variant="outline" className="gap-1 pl-3 pr-1 py-1.5">
                    {value}
                    <button onClick={() => removeValue(value)} className="ml-1 hover:text-destructive rounded-sm p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {culturalValues.length === 0 && <p className="text-sm text-muted-foreground">No values added yet</p>}
              </div>
            </div>
          </div>

          {/* Work Preferences Section */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Work Preferences</h3>
            <div>
              <Label>Work Mode Preferences</Label>
              <p className="text-xs text-muted-foreground mb-2">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {(["remote", "hybrid", "onsite"] as WorkMode[]).map((mode) => (
                  <Button
                    key={mode}
                    type="button"
                    variant={workModePreferences.includes(mode) ? "default" : "outline"}
                    onClick={() => toggleWorkMode(mode)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Preferred Company Types</Label>
              <p className="text-xs text-muted-foreground mb-2">What type of organization interests you?</p>
              <div className="flex flex-wrap gap-2">
                {(["startup", "scaleup", "enterprise", "agency", "nonprofit"] as CompanyType[]).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={companyTypePreferences.includes(type) ? "default" : "outline"}
                    onClick={() => toggleCompanyType(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Location & Compensation Section */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Location & Compensation
            </h3>
            <div>
              <Label>Location Preferences</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  placeholder="Add a location (e.g., San Francisco, New York, Remote)"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                />
                <Button type="button" size="icon" onClick={addLocation}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 min-h-[2rem]">
                {locationPreferences.map((location) => (
                  <Badge key={location} variant="secondary" className="gap-1 pl-3 pr-1 py-1.5">
                    {location}
                    <button
                      onClick={() => removeLocation(location)}
                      className="ml-1 hover:text-destructive rounded-sm p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {locationPreferences.length === 0 && (
                  <p className="text-sm text-muted-foreground">No locations added yet</p>
                )}
              </div>
            </div>

            <div>
              <Label>Expected Salary Range</Label>
              <p className="text-xs text-muted-foreground mb-2">Annual compensation expectations (USD)</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salaryMin" className="text-xs text-muted-foreground">
                    Minimum
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    min="0"
                    step="5000"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="salaryMax" className="text-xs text-muted-foreground">
                    Maximum
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    min="0"
                    step="5000"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
              <p className="text-sm mt-2">
                ${salaryMin.toLocaleString('en-US')} - ${salaryMax.toLocaleString('en-US')} per year
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button onClick={handleSave} className="flex-1" size="lg">
              {profile ? "Save Changes" : "Create Profile"}
            </Button>
            {profile && (
              <Button variant="outline" onClick={() => setIsEditing(false)} size="lg">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

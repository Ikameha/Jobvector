"use client"

import { useState, useEffect } from "react"
import { Profile, ExperienceLevel, WorkMode, CompanyType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, CheckCircle2 } from "lucide-react"

interface ProfileFormProps {
    initialProfile?: Profile | null
    onSave: (profile: Profile) => void
    onCancel?: () => void
}

export function ProfileForm({ initialProfile, onSave, onCancel }: ProfileFormProps) {
    // Form state
    const [name, setName] = useState(initialProfile?.name || "")
    const [skills, setSkills] = useState<string[]>(initialProfile?.skills || [])
    const [skillInput, setSkillInput] = useState("")
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(initialProfile?.experienceLevel || "mid")
    const [yearsOfExperience, setYearsOfExperience] = useState(initialProfile?.yearsOfExperience || 3)
    const [locationPreferences, setLocationPreferences] = useState<string[]>(initialProfile?.locationPreferences || [])
    const [locationInput, setLocationInput] = useState("")
    const [workModePreferences, setWorkModePreferences] = useState<WorkMode[]>(initialProfile?.workModePreferences || ["remote"])
    const [salaryMin, setSalaryMin] = useState(initialProfile?.salaryMin || 80000)
    const [salaryMax, setSalaryMax] = useState(initialProfile?.salaryMax || 120000)
    const [companyTypePreferences, setCompanyTypePreferences] = useState<CompanyType[]>(initialProfile?.companyTypePreferences || ["startup"])
    const [culturalValues, setCulturalValues] = useState<string[]>(initialProfile?.culturalValues || [])
    const [valueInput, setValueInput] = useState("")

    const handleSave = () => {
        const newProfile: Profile = {
            id: initialProfile?.id || `profile-${Date.now()}`,
            userId: "user-1",
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
            createdAt: initialProfile?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        onSave(newProfile)
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

    return (
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
                        {initialProfile ? "Save Changes" : "Create Profile"}
                    </Button>
                    {onCancel && (
                        <Button variant="outline" onClick={onCancel} size="lg">
                            Cancel
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

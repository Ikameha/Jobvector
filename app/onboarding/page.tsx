"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { StepIndicator } from "@/components/onboarding/StepIndicator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Profile, ExperienceLevel, WorkMode, CompanyType } from "@/lib/types"
import { saveProfile } from "@/lib/storage"
import { ArrowRight, ArrowLeft, Briefcase, MapPin, Building2, Plus, X, Laptop, Home, Building } from "lucide-react"

// Initial empty profile
const INITIAL_PROFILE: Profile = {
    id: crypto.randomUUID(),
    userId: "user_" + crypto.randomUUID(),
    name: "",
    skills: [],
    experienceLevel: "mid",
    yearsOfExperience: 3,
    locationPreferences: [],
    workModePreferences: ["hybrid"],
    salaryMin: 50000,
    salaryMax: 120000,
    companyTypePreferences: ["scaleup"],
    culturalValues: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

const STEPS = [
    { title: "Identity", description: "Let's start with the basics" },
    { title: "Skills", description: "What are your superpowers?" },
    { title: "Preferences", description: "Define your ideal role" },
    { title: "Analyzing", description: "Finding your best matches..." },
]

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE)
    const [skillInput, setSkillInput] = useState("")
    const [locationInput, setLocationInput] = useState("")

    const totalSteps = 4

    const updateProfile = (updates: Partial<Profile>) => {
        setProfile((prev) => ({ ...prev, ...updates }))
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1)
        }
        if (currentStep === 3) {
            // Finalize and save on entering step 4 (Analyzing)
            completeOnboarding()
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const completeOnboarding = () => {
        // Save to storage
        saveProfile(profile)
        // Redirect after animation (simulated in useEffect or just timeout here)
        setTimeout(() => {
            router.push("/dashboard")
        }, 3000)
    }

    // --- Step Renderers ---

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="e.g. Alex Chen"
                        value={profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="h-12 text-lg"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Years of Experience: {profile.yearsOfExperience}</Label>
                    <Slider
                        value={[profile.yearsOfExperience]}
                        onValueChange={(val) => updateProfile({ yearsOfExperience: val[0] })}
                        min={0}
                        max={20}
                        step={1}
                        className="py-4"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {(["entry", "mid", "senior", "lead", "executive"] as ExperienceLevel[]).map((level) => (
                            <div
                                key={level}
                                onClick={() => updateProfile({ experienceLevel: level })}
                                className={`
                                    cursor-pointer rounded-xl border-2 p-4 text-center transition-all
                                    ${profile.experienceLevel === level
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-muted hover:border-primary/50"}
                                `}
                            >
                                <div className="capitalize font-semibold">{level}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex gap-2">
                    <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && skillInput) {
                                e.preventDefault()
                                if (!profile.skills.includes(skillInput)) {
                                    updateProfile({ skills: [...profile.skills, skillInput] })
                                    setSkillInput("")
                                }
                            }
                        }}
                        placeholder="Type a skill and press Enter (e.g. React, UX Design)"
                        className="h-12"
                    />
                    <Button
                        onClick={() => {
                            if (skillInput && !profile.skills.includes(skillInput)) {
                                updateProfile({ skills: [...profile.skills, skillInput] })
                                setSkillInput("")
                            }
                        }}
                        variant="secondary"
                        className="h-12 w-12 p-0"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 min-h-[100px] p-4 bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
                    {profile.skills.length === 0 && (
                        <span className="text-muted-foreground text-sm w-full text-center py-8">No skills added yet</span>
                    )}
                    {profile.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1 text-sm flex items-center gap-1">
                            {skill}
                            <button
                                onClick={() => updateProfile({ skills: profile.skills.filter(s => s !== skill) })}
                                className="hover:bg-destructive/10 hover:text-destructive rounded-full p-0.5 ml-1 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                    <span>Suggestions:</span>
                    {["React", "Node.js", "Python", "Design Systems"].map(s => (
                        <button
                            key={s}
                            onClick={() => !profile.skills.includes(s) && updateProfile({ skills: [...profile.skills, s] })}
                            className="hover:text-primary transition-colors underline decoration-dotted"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderStep3 = () => (
        <div className="space-y-8">
            {/* Work Mode */}
            <div className="space-y-3">
                <Label>Preferred Work Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: "remote", label: "Remote", icon: Laptop },
                        { id: "hybrid", label: "Hybrid", icon: Building2 },
                        { id: "onsite", label: "Onsite", icon: MapPin },
                    ].map((mode) => {
                        const isSelected = profile.workModePreferences.includes(mode.id as WorkMode)
                        const Icon = mode.icon
                        return (
                            <div
                                key={mode.id}
                                onClick={() => {
                                    const newModes = isSelected
                                        ? profile.workModePreferences.filter(m => m !== mode.id)
                                        : [...profile.workModePreferences, mode.id as WorkMode]
                                    updateProfile({ workModePreferences: newModes })
                                }}
                                className={`
                                    cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all
                                    ${isSelected
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-muted hover:border-primary/50 text-muted-foreground"}
                                `}
                            >
                                <Icon className="w-6 h-6" />
                                <span className="font-medium text-sm">{mode.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Salary */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Expected Salary Range (Annual)</Label>
                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        ${(profile.salaryMin / 1000).toFixed(0)}k - ${(profile.salaryMax / 1000).toFixed(0)}k
                    </span>
                </div>
                <Slider
                    value={[profile.salaryMin, profile.salaryMax]}
                    onValueChange={(val) => updateProfile({ salaryMin: val[0], salaryMax: val[1] })}
                    min={0}
                    max={300000}
                    step={5000}
                    minStepsBetweenThumbs={1}
                    className="py-4"
                />
            </div>

            {/* Locations */}
            <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <div className="flex gap-2">
                    <Input
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && locationInput) {
                                e.preventDefault()
                                if (!profile.locationPreferences.includes(locationInput)) {
                                    updateProfile({ locationPreferences: [...profile.locationPreferences, locationInput] })
                                    setLocationInput("")
                                }
                            }
                        }}
                        placeholder="Add city or region (e.g. London, Remote)"
                    />
                    <Button
                        onClick={() => {
                            if (locationInput && !profile.locationPreferences.includes(locationInput)) {
                                updateProfile({ locationPreferences: [...profile.locationPreferences, locationInput] })
                                setLocationInput("")
                            }
                        }}
                        variant="secondary"
                    >
                        Add
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {profile.locationPreferences.map(loc => (
                        <Badge key={loc} variant="outline" className="pl-2 pr-1 py-1 gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            {loc}
                            <button
                                onClick={() => updateProfile({ locationPreferences: profile.locationPreferences.filter(l => l !== loc) })}
                                className="ml-1 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderStep4 = () => (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-muted opacity-30" />
                <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <Building2 className="w-12 h-12 text-primary" />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Analyzing Your Profile</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
                We're scanning thousands of job opportunities to find your perfect match based on your skills and preferences.
            </p>

            <div className="w-full max-w-sm bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
            </div>
        </div>
    )

    return (
        <>
            {/* Progress Indicator */}
            {currentStep < 4 && (
                <StepIndicator
                    currentStep={currentStep}
                    totalSteps={4}
                    labels={["Identity", "Skills", "Preferences", "Done"]}
                />
            )}

            {/* Main Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl mx-auto"
            >
                <div className="bg-card border border-border shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden">
                    {currentStep < 4 && (
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{STEPS[currentStep - 1].title}</h1>
                            <p className="text-muted-foreground">{STEPS[currentStep - 1].description}</p>
                        </div>
                    )}

                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep === 1 && renderStep1()}
                                {currentStep === 2 && renderStep2()}
                                {currentStep === 3 && renderStep3()}
                                {currentStep === 4 && renderStep4()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    {currentStep < 4 && (
                        <div className="flex justify-between items-center mt-10 pt-6 border-t border-border/50">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className={currentStep === 1 ? "invisible" : ""}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>

                            <Button
                                onClick={handleNext}
                                variant="neon"
                                size="lg"
                                className="px-8"
                                disabled={currentStep === 1 && !profile.name} // Basic validation
                            >
                                {currentStep === 3 ? "Complete Profile" : "Continue"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    )
}

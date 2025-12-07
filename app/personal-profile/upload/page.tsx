"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CVUploadZone } from "@/components/cv-upload/CVUploadZone"
import { SkillsExtractor } from "@/components/cv-upload/SkillsExtractor"
import { mockExtractSkillsFromCV, type CVExtractionResult } from "@/lib/cvParser"
import { loadProfile, saveProfile } from "@/lib/storage"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function CVUploadPage() {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [extractionResult, setExtractionResult] = useState<CVExtractionResult | null>(null)
    const [extractedSkills, setExtractedSkills] = useState<string[]>([])
    const [isComplete, setIsComplete] = useState(false)

    const handleFileSelect = async (file: File) => {
        setSelectedFile(file)
        setIsProcessing(true)
        setExtractionResult(null)

        try {
            const result = await mockExtractSkillsFromCV(file)
            setExtractionResult(result)
            setExtractedSkills([...result.skills.map(s => s.name), ...result.softSkills])
        } catch (error) {
            console.error("Error extracting skills:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleRemoveFile = () => {
        setSelectedFile(null)
        setExtractionResult(null)
        setExtractedSkills([])
    }

    const handleApplyToProfile = () => {
        if (!extractionResult) return

        // Load existing profile or create new one
        const existingProfile = loadProfile()

        const updatedProfile = {
            ...(existingProfile || {
                id: `profile-${Date.now()}`,
                userId: "user-1",
                name: "My Profile",
                locationPreferences: [],
                workModePreferences: ["remote", "hybrid"],
                salaryMin: 80000,
                salaryMax: 120000,
                companyTypePreferences: ["startup"],
                culturalValues: [],
                createdAt: new Date().toISOString(),
            }),
            skills: extractedSkills,
            experienceLevel: extractionResult.experienceLevel,
            yearsOfExperience: extractionResult.yearsOfExperience,
            updatedAt: new Date().toISOString(),
        }

        saveProfile(updatedProfile)
        setIsComplete(true)
    }

    if (isComplete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Profile Updated!</h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Your skills and experience have been successfully added to your profile.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => router.push("/personal-profile")}>
                            View Profile
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => router.push("/jobs")}>
                            Browse Jobs
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/personal-profile">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Upload Your CV</h1>
                    <p className="text-lg text-muted-foreground">
                        Let our AI extract your skills and experience automatically
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Upload Zone */}
                    <CVUploadZone
                        selectedFile={selectedFile}
                        onFileSelect={handleFileSelect}
                        onRemoveFile={handleRemoveFile}
                    />

                    {/* Skills Extractor */}
                    {(isProcessing || extractionResult) && (
                        <SkillsExtractor
                            extractionResult={extractionResult}
                            isProcessing={isProcessing}
                            onSkillsUpdate={setExtractedSkills}
                            onApply={handleApplyToProfile}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

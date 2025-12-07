"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "@/components/questionnaire/QuestionCard"
import { ProgressBar } from "@/components/questionnaire/ProgressBar"
import { QUESTIONNAIRE } from "@/data/questionnaire"
import {
    saveQuestionnaireProgress,
    loadQuestionnaireProgress,
    clearQuestionnaireProgress,
    generateProfileFromQuestionnaire,
    type QuestionnaireAnswers,
} from "@/lib/questionnaireLogic"
import { saveProfile } from "@/lib/storage"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

export default function QuestionnaireBuilderPage() {
    const router = useRouter()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<QuestionnaireAnswers>({})
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        // Load saved progress
        const saved = loadQuestionnaireProgress()
        if (saved) {
            setAnswers(saved)
        }
    }, [])

    useEffect(() => {
        // Auto-save progress
        if (Object.keys(answers).length > 0) {
            saveQuestionnaireProgress(answers)
        }
    }, [answers])

    const question = QUESTIONNAIRE[currentQuestion]
    const answerKey = `question${question.id}` as keyof QuestionnaireAnswers
    const selectedAnswer = answers[answerKey]

    const handleSelectOption = (optionId: string) => {
        setAnswers((prev) => ({
            ...prev,
            [answerKey]: optionId,
        }))
    }

    const handleNext = () => {
        if (currentQuestion < QUESTIONNAIRE.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
        } else {
            setIsComplete(true)
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1)
        }
    }

    const handleComplete = () => {
        // Generate profile from answers
        const profile = generateProfileFromQuestionnaire(answers, "Questionnaire Profile")

        // Save profile
        saveProfile(profile)

        // Clear questionnaire progress
        clearQuestionnaireProgress()

        // Redirect to profile page
        router.push("/personal-profile")
    }

    const canProceed = !!selectedAnswer

    if (isComplete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Profile Created!</h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            We've created your professional profile based on your answers. You can now refine it further or start
                            browsing matched jobs.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={handleComplete} className="gap-2">
                            <Sparkles className="w-4 h-4" />
                            View My Profile
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
                    <Button variant="ghost" size="sm" onClick={() => router.push("/personal-profile")} className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Profile
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <ProgressBar currentStep={currentQuestion + 1} totalSteps={QUESTIONNAIRE.length} />

                <div className="mb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">{question.question}</h1>
                    <p className="text-muted-foreground">Select the option that best describes you</p>
                </div>

                <div className="space-y-4 mb-12">
                    {question.options.map((option) => (
                        <QuestionCard
                            key={option.id}
                            option={option}
                            isSelected={selectedAnswer === option.id}
                            onSelect={() => handleSelectOption(option.id)}
                        />
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentQuestion === 0}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>

                    <div className="text-sm text-muted-foreground">
                        {currentQuestion + 1} / {QUESTIONNAIRE.length}
                    </div>

                    <Button
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="gap-2"
                    >
                        {currentQuestion === QUESTIONNAIRE.length - 1 ? "Complete" : "Next"}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

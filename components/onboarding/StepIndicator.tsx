"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
    labels?: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
    return (
        <div className="w-full max-w-xl mx-auto mb-12">
            <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNum = i + 1
                    const isActive = stepNum === currentStep
                    const isCompleted = stepNum < currentStep

                    return (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 z-10 bg-background
                                    ${isActive ? 'border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]' : ''}
                                    ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : ''}
                                    ${!isActive && !isCompleted ? 'border-muted text-muted-foreground' : ''}
                                `}
                                initial={false}
                                animate={{ scale: isActive ? 1.2 : 1 }}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                            </motion.div>
                            {labels && (
                                <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {labels[i]}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

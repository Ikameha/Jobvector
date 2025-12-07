"use client"

import { useState, useCallback } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { Upload, File, X, Check } from "lucide-react"
import { validateCVFile } from "@/lib/cvParser"

interface CVUploadZoneProps {
    onFileSelect: (file: File) => void
    selectedFile: File | null
    onRemoveFile: () => void
}

export function CVUploadZone({ onFileSelect, selectedFile, onRemoveFile }: CVUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        setError(null)

        const file = e.dataTransfer.files[0]
        if (file) {
            const validation = validateCVFile(file)
            if (validation.valid) {
                onFileSelect(file)
            } else {
                setError(validation.error || "Invalid file")
            }
        }
    }, [onFileSelect])

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const file = e.target.files?.[0]
        if (file) {
            const validation = validateCVFile(file)
            if (validation.valid) {
                onFileSelect(file)
            } else {
                setError(validation.error || "Invalid file")
            }
        }
    }, [onFileSelect])

    if (selectedFile) {
        return (
            <GlassCard intensity="medium" neonBorder className="p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <File className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <Check className="w-4 h-4" />
                            <span>Ready</span>
                        </div>
                        <button
                            onClick={onRemoveFile}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </GlassCard>
        )
    }

    return (
        <div>
            <GlassCard
                intensity="medium"
                neonBorder={isDragging}
                className={cn(
                    "p-12 transition-all duration-300",
                    isDragging && "bg-primary/10 scale-[1.02]"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <div className={cn(
                        "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300",
                        isDragging ? "bg-primary/30 scale-110" : "bg-primary/20"
                    )}>
                        <Upload className={cn(
                            "w-8 h-8 transition-all duration-300",
                            isDragging ? "text-primary scale-110" : "text-primary"
                        )} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        {isDragging ? "Drop your CV here" : "Drag & drop your CV here"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        or click to browse
                    </p>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileInput}
                        className="hidden"
                        id="cv-upload"
                    />
                    <label
                        htmlFor="cv-upload"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >
                        Choose File
                    </label>
                    <p className="text-xs text-muted-foreground mt-4">
                        Supports PDF, DOC, DOCX (max 5MB)
                    </p>
                </div>
            </GlassCard>
            {error && (
                <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}
        </div>
    )
}

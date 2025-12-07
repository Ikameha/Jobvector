export type ProfileStep = "location" | "values" | "skills" | "summary"

export interface ProfileProgress {
    xp: number
    completedSteps: ProfileStep[]
    badges: string[]
}

const STORAGE_KEY = "profile_progress"

// Badge labels for display
export const BADGE_LABELS: Record<string, string> = {
    location_explorer: "Location Explorer",
    values_driven: "Values Driven",
    skillful: "Skillful",
    profile_complete: "Profile Complete",
}

/**
 * Load profile progress from localStorage
 */
export function loadProfileProgress(): ProfileProgress | null {
    if (typeof window === "undefined") return null

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return null
        return JSON.parse(stored)
    } catch (error) {
        console.error("[v0] Failed to load profile progress:", error)
        return null
    }
}

/**
 * Save profile progress to localStorage
 */
export function saveProfileProgress(progress: ProfileProgress): void {
    if (typeof window === "undefined") return

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch (error) {
        console.error("[v0] Failed to save profile progress:", error)
    }
}

/**
 * Get or initialize progress
 */
function getOrInitProgress(): ProfileProgress {
    const existing = loadProfileProgress()
    if (existing) return existing

    return {
        xp: 0,
        completedSteps: [],
        badges: [],
    }
}

/**
 * Add XP to the current progress
 */
export function addXp(amount: number): ProfileProgress {
    const progress = getOrInitProgress()
    progress.xp = Math.max(0, Math.min(99999, progress.xp + amount))
    saveProfileProgress(progress)
    return progress
}

/**
 * Mark a step as completed (no duplicates)
 */
export function markStepCompleted(step: ProfileStep): ProfileProgress {
    const progress = getOrInitProgress()
    if (!progress.completedSteps.includes(step)) {
        progress.completedSteps.push(step)
    }
    saveProfileProgress(progress)
    return progress
}

/**
 * Unlock a badge (no duplicates)
 */
export function unlockBadge(badgeId: string): ProfileProgress {
    const progress = getOrInitProgress()
    if (!progress.badges.includes(badgeId)) {
        progress.badges.push(badgeId)
    }
    saveProfileProgress(progress)
    return progress
}

/**
 * Calculate completion percentage based on steps
 */
export function getCompletionPercent(progress: ProfileProgress): number {
    const totalSteps = 4 // location, values, skills, summary
    const completed = progress.completedSteps.length
    return Math.round((completed / totalSteps) * 100)
}

/**
 * Reset all progress (useful for testing)
 */
export function resetProgress(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
}

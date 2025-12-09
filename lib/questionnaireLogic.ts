import type { Profile, CompanyType, WorkMode } from "./types"

export interface QuestionnaireAnswers {
    question1?: string // Core Motivation
    question2?: string // Ecosystem Fit
    question3?: string // Success Metric
    question4?: string // Flow State
    question5?: string // Dealbreaker
}

const QUESTIONNAIRE_STORAGE_KEY = "job-pulse-questionnaire"

export function saveQuestionnaireProgress(answers: QuestionnaireAnswers): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(answers))
    }
}

export function loadQuestionnaireProgress(): QuestionnaireAnswers | null {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(QUESTIONNAIRE_STORAGE_KEY)
        return saved ? JSON.parse(saved) : null
    }
    return null
}

export function clearQuestionnaireProgress(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(QUESTIONNAIRE_STORAGE_KEY)
    }
}

const QUESTIONNAIRE_COMPLETED_KEY = "job-pulse-questionnaire-completed"

export function markQuestionnaireCompleted(): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(QUESTIONNAIRE_COMPLETED_KEY, "true")
    }
}

export function hasCompletedQuestionnaire(): boolean {
    if (typeof window !== "undefined") {
        return localStorage.getItem(QUESTIONNAIRE_COMPLETED_KEY) === "true"
    }
    return false
}

export function generateProfileFromQuestionnaire(
    answers: QuestionnaireAnswers,
    name: string = "My Profile"
): Profile {
    const culturalValues: string[] = []
    const companyTypePreferences: CompanyType[] = []
    const workModePreferences: WorkMode[] = []
    let salaryMin = 80000
    let salaryMax = 120000

    // Question 1: Core Motivation
    switch (answers.question1) {
        case "innovation":
            culturalValues.push("innovation", "impact")
            companyTypePreferences.push("startup", "scaleup")
            break
        case "financial":
            culturalValues.push("growth", "performance")
            companyTypePreferences.push("enterprise", "scaleup")
            salaryMin = 100000
            salaryMax = 150000
            break
        case "mastery":
            culturalValues.push("learning", "excellence")
            companyTypePreferences.push("enterprise", "startup")
            break
        case "team":
            culturalValues.push("collaboration", "culture")
            companyTypePreferences.push("scaleup", "enterprise")
            break
        case "balance":
            culturalValues.push("work-life-balance", "flexibility")
            companyTypePreferences.push("enterprise")
            workModePreferences.push("remote", "hybrid")
            break
    }

    // Question 2: Ecosystem Fit
    switch (answers.question2) {
        case "early-startup":
            if (!companyTypePreferences.includes("startup")) {
                companyTypePreferences.push("startup")
            }
            workModePreferences.push("onsite", "hybrid")
            break
        case "growth-startup":
            if (!companyTypePreferences.includes("scaleup")) {
                companyTypePreferences.push("scaleup")
            }
            workModePreferences.push("hybrid", "remote")
            break
        case "established":
            if (!companyTypePreferences.includes("enterprise")) {
                companyTypePreferences.push("enterprise")
            }
            workModePreferences.push("onsite", "hybrid")
            break
        case "agency":
            companyTypePreferences.push("agency")
            workModePreferences.push("hybrid")
            break
        case "remote-first":
            workModePreferences.push("remote")
            break
    }

    // Question 3: Success Metric
    switch (answers.question3) {
        case "revenue":
            culturalValues.push("impact", "growth")
            break
        case "recognition":
            culturalValues.push("achievement", "visibility")
            break
        case "craft":
            culturalValues.push("excellence", "innovation")
            break
        case "team-growth":
            culturalValues.push("mentorship", "leadership")
            break
        case "learning":
            if (!culturalValues.includes("learning")) {
                culturalValues.push("learning", "development")
            }
            break
    }

    // Question 4: Flow State
    switch (answers.question4) {
        case "deep-focus":
            culturalValues.push("autonomy", "focus")
            break
        case "fast-iteration":
            culturalValues.push("agility", "shipping")
            break
        case "collaboration":
            if (!culturalValues.includes("collaboration")) {
                culturalValues.push("teamwork", "collaboration")
            }
            break
        case "structured":
            culturalValues.push("process", "clarity")
            break
        case "flexible":
            if (!culturalValues.includes("flexibility")) {
                culturalValues.push("flexibility", "autonomy")
            }
            break
    }

    // Question 5: Dealbreaker
    switch (answers.question5) {
        case "office-requirement":
            // Ensure remote is prioritized
            const remoteIndex = workModePreferences.indexOf("remote")
            if (remoteIndex > -1) {
                workModePreferences.splice(remoteIndex, 1)
                workModePreferences.unshift("remote")
            } else {
                workModePreferences.unshift("remote")
            }
            break
        case "long-hours":
            if (!culturalValues.includes("work-life-balance")) {
                culturalValues.push("work-life-balance")
            }
            break
        case "corporate-politics":
            culturalValues.push("transparency", "flat-hierarchy")
            break
        case "legacy-tech":
            culturalValues.push("innovation", "modern-stack")
            break
        case "below-market":
            salaryMin = Math.round(salaryMin * 1.2)
            salaryMax = Math.round(salaryMax * 1.2)
            break
    }

    // Remove duplicates
    const uniqueValues = Array.from(new Set(culturalValues))
    const uniqueCompanyTypes = Array.from(new Set(companyTypePreferences))
    const uniqueWorkModes = Array.from(new Set(workModePreferences))

    return {
        id: `profile-${Date.now()}`,
        userId: "user-1",
        name,
        skills: [], // To be filled in later
        experienceLevel: "mid",
        yearsOfExperience: 3,
        locationPreferences: [],
        workModePreferences: uniqueWorkModes.length > 0 ? uniqueWorkModes : ["remote", "hybrid"],
        salaryMin,
        salaryMax,
        companyTypePreferences: uniqueCompanyTypes.length > 0 ? uniqueCompanyTypes : ["startup"],
        culturalValues: uniqueValues,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}

// Client-side storage layer (localStorage) - will be replaced with Supabase later

import type { Profile, JobAnalysis } from "./types"

// Storage keys
const PROFILE_KEY = "jobpulse_profile"
const ANALYSES_KEY = "jobpulse_analyses"

// Profile operations
export function saveProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function loadProfile(): Profile | null {
  const data = localStorage.getItem(PROFILE_KEY)
  return data ? JSON.parse(data) : null
}

export function deleteProfile(): void {
  localStorage.removeItem(PROFILE_KEY)
}

// Job analysis operations
export function saveJobAnalysis(analysis: JobAnalysis): void {
  const analyses = loadJobAnalyses()

  // Check if analysis for this job already exists
  const existingIndex = analyses.findIndex((a) => a.jobId === analysis.jobId)

  if (existingIndex >= 0) {
    // Update existing analysis
    analyses[existingIndex] = analysis
  } else {
    // Add new analysis
    analyses.push(analysis)
  }

  localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses))
}

export function loadJobAnalyses(): JobAnalysis[] {
  const data = localStorage.getItem(ANALYSES_KEY)
  return data ? JSON.parse(data) : []
}

export function loadJobAnalysisById(analysisId: string): JobAnalysis | null {
  const analyses = loadJobAnalyses()
  return analyses.find((a) => a.id === analysisId) || null
}

export function deleteJobAnalysis(analysisId: string): void {
  const analyses = loadJobAnalyses()
  const filtered = analyses.filter((a) => a.id !== analysisId)
  localStorage.setItem(ANALYSES_KEY, JSON.stringify(filtered))
}

export function clearAllData(): void {
  deleteProfile()
  localStorage.removeItem(ANALYSES_KEY)
}

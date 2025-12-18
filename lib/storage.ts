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


// Application Tracker Operations
const TRACKER_KEY = "jobpulse_tracker"
const SAVED_JOBS_KEY_LEGACY = "jobpulse_saved_jobs"

export type ApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'

export interface Application {
  jobId: string
  status: ApplicationStatus
  dateUpdated: string
  notes?: string
}

// Migration helper
function migrateLegacyData() {
  if (typeof window === 'undefined') return
  const legacyData = localStorage.getItem(SAVED_JOBS_KEY_LEGACY)
  if (legacyData) {
    const ids: string[] = JSON.parse(legacyData)
    const currentTracker = getApplications()

    let hasChanges = false
    ids.forEach(id => {
      if (!currentTracker.some(app => app.jobId === id)) {
        currentTracker.push({
          jobId: id,
          status: 'Saved',
          dateUpdated: new Date().toISOString()
        })
        hasChanges = true
      }
    })

    if (hasChanges) {
      localStorage.setItem(TRACKER_KEY, JSON.stringify(currentTracker))
    }
    // Optional: Clear legacy data or keep as backup? keeping for safety.
    localStorage.removeItem(SAVED_JOBS_KEY_LEGACY)
  }
}

export function getApplications(): Application[] {
  if (typeof window === 'undefined') return []

  // Trigger migration once
  if (localStorage.getItem(SAVED_JOBS_KEY_LEGACY)) {
    migrateLegacyData()
  }

  const data = localStorage.getItem(TRACKER_KEY)
  return data ? JSON.parse(data) : []
}

export function getApplication(jobId: string): Application | undefined {
  const apps = getApplications()
  return apps.find(a => a.jobId === jobId)
}

export function updateApplicationStatus(jobId: string, status: ApplicationStatus): void {
  const apps = getApplications()
  const index = apps.findIndex(a => a.jobId === jobId)

  if (index >= 0) {
    apps[index].status = status
    apps[index].dateUpdated = new Date().toISOString()
  } else {
    // If not found, add it (edge case)
    apps.push({
      jobId,
      status,
      dateUpdated: new Date().toISOString()
    })
  }

  localStorage.setItem(TRACKER_KEY, JSON.stringify(apps))
}

export function toggleApplication(jobId: string): boolean {
  if (typeof window === 'undefined') return false
  const apps = getApplications()
  const index = apps.findIndex(a => a.jobId === jobId)
  let isTracked = false

  if (index >= 0) {
    // Remove if exists (toggle off)
    apps.splice(index, 1)
    isTracked = false
  } else {
    // Add if new (toggle on) -> Default to 'Saved'
    apps.push({
      jobId,
      status: 'Saved',
      dateUpdated: new Date().toISOString()
    })
    isTracked = true
  }

  localStorage.setItem(TRACKER_KEY, JSON.stringify(apps))
  return isTracked
}

// Compatibility for existing components using "isJobSaved"
export function isJobSaved(jobId: string): boolean {
  return !!getApplication(jobId)
}

// Compatibility wrapper for toggleSavedJob
export function toggleSavedJob(jobId: string): boolean {
  return toggleApplication(jobId)
}

export function clearAllData(): void {
  deleteProfile()
  localStorage.removeItem(ANALYSES_KEY)
  localStorage.removeItem(TRACKER_KEY)
  localStorage.removeItem(SAVED_JOBS_KEY_LEGACY)
}

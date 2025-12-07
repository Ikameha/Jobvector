// Core type definitions for Job Pulse

export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive"
export type WorkMode = "remote" | "hybrid" | "onsite"
export type CompanyType = "startup" | "scaleup" | "enterprise" | "agency" | "nonprofit"
export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance"

export interface Profile {
  id: string
  userId: string
  name: string
  skills: string[] // e.g., ["React", "TypeScript", "Node.js"]
  experienceLevel: ExperienceLevel
  yearsOfExperience: number
  locationPreferences: string[] // e.g., ["San Francisco", "Remote", "New York"]
  workModePreferences: WorkMode[]
  salaryMin: number
  salaryMax: number
  companyTypePreferences: CompanyType[]
  culturalValues: string[] // e.g., ["work-life balance", "innovation", "diversity"]
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  title: string
  company: string
  companyType: CompanyType
  description: string
  requiredSkills: string[]
  niceToHaveSkills: string[]
  experienceLevel: ExperienceLevel
  location: string
  workMode: WorkMode
  employmentType: EmploymentType
  salaryMin: number
  salaryMax: number
  benefits: string[]
  culturalValues: string[]
  postedAt: string
  externalUrl?: string
}

export interface MatchScore {
  overall: number // 0-100
  skillsFit: number // 0-100
  experienceFit: number // 0-100
  locationFit: number // 0-100
  salaryFit: number // 0-100
  cultureFit: number // 0-100
}

export interface MatchExplanation {
  skillsFit: string
  experienceFit: string
  locationFit: string
  salaryFit: string
  cultureFit: string
  overallSummary: string
}

export type ApplicationStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected"

export interface JobAnalysis {
  id: string
  profileId: string
  jobId: string
  job: Job // Snapshot of the job at time of analysis
  matchScore: MatchScore
  matchExplanation: MatchExplanation
  analyzedAt: string
  status: ApplicationStatus
  notes?: string
  updatedAt?: string
}

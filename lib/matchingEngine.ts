// Job matching and scoring logic

import type { Profile, Job, MatchScore, MatchExplanation } from "./types"

/**
 * Calculate match score between a profile and a job
 * Returns scores from 0-100 for each category and overall
 */
export function calculateMatchScore(profile: Profile, job: Job): MatchScore {
  const skillsFit = calculateSkillsFit(profile.skills, job.requiredSkills, job.niceToHaveSkills)
  const experienceFit = calculateExperienceFit(profile.experienceLevel, profile.yearsOfExperience, job.experienceLevel)
  const locationFit = calculateLocationFit(
    profile.locationPreferences,
    job.location,
    job.workMode,
    profile.workModePreferences,
  )
  const salaryFit = calculateSalaryFit(profile.salaryMin, profile.salaryMax, job.salaryMin, job.salaryMax)
  const cultureFit = calculateCultureFit(
    profile.culturalValues,
    profile.companyTypePreferences,
    job.culturalValues,
    job.companyType,
  )

  // Weighted overall score: Skills 40%, Experience 25%, Location 15%, Salary 10%, Culture 10%
  const overall = Math.round(
    skillsFit * 0.4 + experienceFit * 0.25 + locationFit * 0.15 + salaryFit * 0.1 + cultureFit * 0.1,
  )

  return {
    overall,
    skillsFit: Math.round(skillsFit),
    experienceFit: Math.round(experienceFit),
    locationFit: Math.round(locationFit),
    salaryFit: Math.round(salaryFit),
    cultureFit: Math.round(cultureFit),
  }
}

/**
 * Generate human-readable explanations for match scores
 */
export function generateMatchExplanation(profile: Profile, job: Job, score: MatchScore): MatchExplanation {
  const matchingSkills = profile.skills.filter((skill) =>
    job.requiredSkills.some((req) => req.toLowerCase() === skill.toLowerCase()),
  )
  const missingSkills = job.requiredSkills.filter(
    (req) => !profile.skills.some((skill) => skill.toLowerCase() === req.toLowerCase()),
  )

  const skillsExplanation =
    score.skillsFit >= 70
      ? `Strong match! You have ${matchingSkills.length} of ${job.requiredSkills.length} required skills: ${matchingSkills.join(", ")}.`
      : score.skillsFit >= 40
        ? `Partial match. You have ${matchingSkills.length} of ${job.requiredSkills.length} required skills. Missing: ${missingSkills.slice(0, 3).join(", ")}.`
        : `Limited match. You're missing key skills: ${missingSkills.slice(0, 3).join(", ")}.`

  const experienceExplanation =
    score.experienceFit >= 80
      ? `Your ${profile.experienceLevel} level (${profile.yearsOfExperience} years) aligns well with the ${job.experienceLevel} position.`
      : score.experienceFit >= 50
        ? `You meet the basic experience requirements, though this role targets ${job.experienceLevel} level candidates.`
        : `This ${job.experienceLevel} role may be a stretch from your current ${profile.experienceLevel} level.`

  const locationExplanation =
    score.locationFit >= 80
      ? `Perfect location match! The ${job.workMode} position in ${job.location} aligns with your preferences.`
      : score.locationFit >= 50
        ? `The location (${job.location}, ${job.workMode}) partially matches your preferences.`
        : `The ${job.workMode} requirement in ${job.location} doesn't align well with your location preferences.`

  const salaryExplanation =
    score.salaryFit >= 80
      ? `Salary range ($${job.salaryMin.toLocaleString()}-$${job.salaryMax.toLocaleString()}) matches your expectations well.`
      : score.salaryFit >= 50
        ? `Salary range has some overlap with your expectations ($${profile.salaryMin.toLocaleString()}-$${profile.salaryMax.toLocaleString()}).`
        : `Salary range ($${job.salaryMin.toLocaleString()}-$${job.salaryMax.toLocaleString()}) is below your minimum of $${profile.salaryMin.toLocaleString()}.`

  const cultureExplanation =
    score.cultureFit >= 70
      ? `Great cultural alignment with shared values around ${profile.culturalValues.slice(0, 2).join(" and ")}.`
      : score.cultureFit >= 40
        ? `Some cultural overlap, though priorities may differ.`
        : `Limited cultural alignment based on stated values.`

  const overallSummary =
    score.overall >= 75
      ? `Excellent match overall! This role aligns well with your profile across skills, experience, and preferences.`
      : score.overall >= 60
        ? `Good match with strong alignment in several key areas. Worth considering!`
        : score.overall >= 40
          ? `Moderate match. Some areas align well, but there are gaps to consider.`
          : `Limited match. Significant gaps in skills, experience, or preferences.`

  return {
    skillsFit: skillsExplanation,
    experienceFit: experienceExplanation,
    locationFit: locationExplanation,
    salaryFit: salaryExplanation,
    cultureFit: cultureExplanation,
    overallSummary,
  }
}

// Helper functions for calculating individual fit scores

function calculateSkillsFit(profileSkills: string[], requiredSkills: string[], niceToHaveSkills: string[]): number {
  if (requiredSkills.length === 0) return 100

  const normalizedProfileSkills = profileSkills.map((s) => s.toLowerCase())
  const matchedRequired = requiredSkills.filter((skill) => normalizedProfileSkills.includes(skill.toLowerCase())).length
  const matchedNiceToHave = niceToHaveSkills.filter((skill) =>
    normalizedProfileSkills.includes(skill.toLowerCase()),
  ).length

  // Required skills are worth 80%, nice-to-have are worth 20%
  const requiredScore = (matchedRequired / requiredSkills.length) * 80
  const niceToHaveScore = niceToHaveSkills.length > 0 ? (matchedNiceToHave / niceToHaveSkills.length) * 20 : 20 // Give full nice-to-have score if none specified

  return requiredScore + niceToHaveScore
}

function calculateExperienceFit(profileLevel: string, profileYears: number, jobLevel: string): number {
  const levelMap: Record<string, number> = {
    entry: 1,
    mid: 2,
    senior: 3,
    lead: 4,
    executive: 5,
  }

  const profileLevelNum = levelMap[profileLevel] || 2
  const jobLevelNum = levelMap[jobLevel] || 2
  const levelDiff = Math.abs(profileLevelNum - jobLevelNum)

  // Perfect match = 100, one level off = 75, two levels = 50, etc.
  if (levelDiff === 0) return 100
  if (levelDiff === 1) return 75
  if (levelDiff === 2) return 50
  return 25
}

function calculateLocationFit(
  profileLocations: string[],
  jobLocation: string,
  jobWorkMode: string,
  profileWorkModes: string[],
): number {
  // Work mode alignment is most important
  const workModeMatch = profileWorkModes.includes(jobWorkMode)

  // Check if any profile location preferences match job location (case-insensitive)
  const normalizedProfileLocs = profileLocations.map((l) => l.toLowerCase())
  const locationMatch = normalizedProfileLocs.some(
    (loc) => jobLocation.toLowerCase().includes(loc) || (loc.includes("remote") && jobWorkMode === "remote"),
  )

  if (workModeMatch && locationMatch) return 100
  if (workModeMatch) return 80
  if (locationMatch) return 60
  if (jobWorkMode === "remote") return 50 // Remote is always somewhat flexible
  return 30
}

function calculateSalaryFit(profileMin: number, profileMax: number, jobMin: number, jobMax: number): number {
  // Check for overlap
  const overlapMin = Math.max(profileMin, jobMin)
  const overlapMax = Math.min(profileMax, jobMax)

  if (overlapMax < overlapMin) {
    // No overlap
    if (jobMax < profileMin) {
      // Job pays below profile minimum
      const gap = profileMin - jobMax
      const gapPercent = gap / profileMin
      return Math.max(0, 100 - gapPercent * 200) // Penalize heavily
    }
    return 50 // Job pays above profile max (not a bad thing)
  }

  // Calculate overlap as percentage of profile range
  const overlapSize = overlapMax - overlapMin
  const profileRange = profileMax - profileMin
  const overlapPercent = profileRange > 0 ? overlapSize / profileRange : 1

  return Math.min(100, 60 + overlapPercent * 40) // 60-100 based on overlap
}

function calculateCultureFit(
  profileValues: string[],
  profileCompanyTypes: string[],
  jobValues: string[],
  jobCompanyType: string,
): number {
  // Company type match
  const companyTypeMatch = profileCompanyTypes.includes(jobCompanyType)

  // Cultural values overlap
  const normalizedProfileValues = profileValues.map((v) => v.toLowerCase())
  const normalizedJobValues = jobValues.map((v) => v.toLowerCase())
  const matchingValues = normalizedJobValues.filter((jv) =>
    normalizedProfileValues.some((pv) => pv.includes(jv) || jv.includes(pv)),
  ).length

  const valuesScore = jobValues.length > 0 ? (matchingValues / jobValues.length) * 70 : 35 // Neutral if no values specified

  const companyTypeScore = companyTypeMatch ? 30 : 15 // Partial credit even if not exact match

  return valuesScore + companyTypeScore
}

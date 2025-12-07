// Mock job API layer - all data is local, no external calls

import type { Job } from "./types"

// Mock job data - 10 diverse job listings
export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "TechFlow Inc",
    companyType: "startup",
    description:
      "Join our fast-growing startup building the next generation of developer tools. We need a senior frontend engineer who can architect scalable React applications and mentor junior developers.",
    requiredSkills: ["React", "TypeScript", "CSS", "JavaScript"],
    niceToHaveSkills: ["Next.js", "Tailwind", "GraphQL"],
    experienceLevel: "senior",
    location: "San Francisco, CA",
    workMode: "hybrid",
    employmentType: "full-time",
    salaryMin: 140000,
    salaryMax: 180000,
    benefits: ["Health insurance", "Equity", "401k", "Unlimited PTO"],
    culturalValues: ["innovation", "autonomy", "fast-paced"],
    postedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    company: "DataCorp",
    companyType: "enterprise",
    description:
      "Large enterprise seeking a full stack developer to maintain and enhance our internal business applications. Work with established teams and proven technologies.",
    requiredSkills: ["Node.js", "React", "PostgreSQL", "REST APIs"],
    niceToHaveSkills: ["Docker", "AWS", "Redis"],
    experienceLevel: "mid",
    location: "Remote",
    workMode: "remote",
    employmentType: "full-time",
    salaryMin: 100000,
    salaryMax: 130000,
    benefits: ["Health insurance", "Dental", "Vision", "401k match", "Professional development"],
    culturalValues: ["work-life balance", "stability", "collaboration"],
    postedAt: "2025-01-18T14:30:00Z",
  },
  {
    id: "job-3",
    title: "Junior React Developer",
    company: "WebStudio",
    companyType: "agency",
    description:
      "Creative digital agency looking for a junior React developer to work on diverse client projects. Great opportunity to learn and grow with mentorship from senior developers.",
    requiredSkills: ["JavaScript", "React", "HTML", "CSS"],
    niceToHaveSkills: ["TypeScript", "Figma", "Git"],
    experienceLevel: "entry",
    location: "Austin, TX",
    workMode: "onsite",
    employmentType: "full-time",
    salaryMin: 65000,
    salaryMax: 80000,
    benefits: ["Health insurance", "Paid time off", "Learning budget"],
    culturalValues: ["creativity", "diversity", "mentorship"],
    postedAt: "2025-01-20T09:00:00Z",
  },
  {
    id: "job-4",
    title: "Staff Engineer - Platform",
    company: "CloudScale",
    companyType: "scaleup",
    description:
      "Lead the architecture and development of our platform infrastructure. Work with cutting-edge technologies to build systems that handle millions of requests per day.",
    requiredSkills: ["TypeScript", "Node.js", "Kubernetes", "AWS", "System Design"],
    niceToHaveSkills: ["Go", "Terraform", "Kafka"],
    experienceLevel: "lead",
    location: "New York, NY",
    workMode: "hybrid",
    employmentType: "full-time",
    salaryMin: 180000,
    salaryMax: 230000,
    benefits: ["Health insurance", "Equity", "401k", "Unlimited PTO", "Home office stipend"],
    culturalValues: ["technical excellence", "ownership", "innovation"],
    postedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "job-5",
    title: "Frontend Developer (Contract)",
    company: "DesignHub",
    companyType: "agency",
    description:
      "6-month contract to build a new customer-facing web application. Work closely with designers to create beautiful, accessible user interfaces.",
    requiredSkills: ["React", "TypeScript", "CSS", "Accessibility"],
    niceToHaveSkills: ["Animation libraries", "Storybook", "Jest"],
    experienceLevel: "mid",
    location: "Remote",
    workMode: "remote",
    employmentType: "contract",
    salaryMin: 80000,
    salaryMax: 100000,
    benefits: ["Flexible hours", "Remote work"],
    culturalValues: ["design excellence", "attention to detail", "collaboration"],
    postedAt: "2025-01-22T16:00:00Z",
  },
  {
    id: "job-6",
    title: "Backend Engineer",
    company: "FinTech Solutions",
    companyType: "enterprise",
    description:
      "Build and maintain secure, scalable backend services for financial applications. Work with modern technologies in a regulated environment.",
    requiredSkills: ["Node.js", "PostgreSQL", "REST APIs", "Security"],
    niceToHaveSkills: ["Python", "Microservices", "Kafka"],
    experienceLevel: "senior",
    location: "Boston, MA",
    workMode: "hybrid",
    employmentType: "full-time",
    salaryMin: 130000,
    salaryMax: 160000,
    benefits: ["Health insurance", "401k match", "Bonus", "Commuter benefits"],
    culturalValues: ["reliability", "security", "teamwork"],
    postedAt: "2025-01-14T13:00:00Z",
  },
  {
    id: "job-7",
    title: "Full Stack Engineer",
    company: "GreenTech Initiative",
    companyType: "nonprofit",
    description:
      "Help us build technology solutions for environmental sustainability. Work on impactful projects that make a real difference in the world.",
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
    niceToHaveSkills: ["GIS", "Data visualization", "Python"],
    experienceLevel: "mid",
    location: "Seattle, WA",
    workMode: "remote",
    employmentType: "full-time",
    salaryMin: 85000,
    salaryMax: 110000,
    benefits: ["Health insurance", "Generous PTO", "Mission-driven work"],
    culturalValues: ["sustainability", "social impact", "work-life balance"],
    postedAt: "2025-01-19T10:30:00Z",
  },
  {
    id: "job-8",
    title: "Engineering Manager",
    company: "ProductFlow",
    companyType: "scaleup",
    description:
      "Lead a team of 6-8 engineers building our core product. Balance technical leadership with people management to help your team grow and deliver.",
    requiredSkills: ["Leadership", "React", "TypeScript", "System Design", "Agile"],
    niceToHaveSkills: ["Product management", "Data analysis", "DevOps"],
    experienceLevel: "lead",
    location: "Los Angeles, CA",
    workMode: "hybrid",
    employmentType: "full-time",
    salaryMin: 160000,
    salaryMax: 200000,
    benefits: ["Health insurance", "Equity", "401k", "Parental leave", "Professional development"],
    culturalValues: ["people first", "transparency", "growth mindset"],
    postedAt: "2025-01-16T08:00:00Z",
  },
  {
    id: "job-9",
    title: "React Native Developer",
    company: "MobileFirst",
    companyType: "startup",
    description:
      "Build beautiful mobile experiences for iOS and Android. Early-stage startup with opportunity to shape the product and technical direction.",
    requiredSkills: ["React Native", "JavaScript", "Mobile development"],
    niceToHaveSkills: ["TypeScript", "iOS", "Android", "GraphQL"],
    experienceLevel: "mid",
    location: "Remote",
    workMode: "remote",
    employmentType: "full-time",
    salaryMin: 110000,
    salaryMax: 140000,
    benefits: ["Health insurance", "Equity", "Flexible hours", "Remote work"],
    culturalValues: ["autonomy", "innovation", "user-focused"],
    postedAt: "2025-01-21T12:00:00Z",
  },
  {
    id: "job-10",
    title: "Frontend Architect",
    company: "TechGiant Corp",
    companyType: "enterprise",
    description:
      "Define frontend architecture standards and patterns for a suite of enterprise applications. Work with multiple teams to drive technical excellence.",
    requiredSkills: ["React", "TypeScript", "Architecture", "Leadership", "Performance"],
    niceToHaveSkills: ["Micro-frontends", "Design systems", "Build tools"],
    experienceLevel: "executive",
    location: "Chicago, IL",
    workMode: "hybrid",
    employmentType: "full-time",
    salaryMin: 200000,
    salaryMax: 250000,
    benefits: ["Health insurance", "Bonus", "401k match", "Stock options", "Relocation assistance"],
    culturalValues: ["technical excellence", "mentorship", "impact"],
    postedAt: "2025-01-10T15:00:00Z",
  },
]

/**
 * Fetch jobs with optional search query
 * @param query - Search term to filter jobs by title or description
 * @returns Promise resolving to filtered jobs
 */
export async function fetchJobs(query?: string): Promise<Job[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!query || query.trim() === "") {
    return MOCK_JOBS
  }

  const lowerQuery = query.toLowerCase()
  return MOCK_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.requiredSkills.some((skill) => skill.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Fetch a single job by ID
 * @param id - Job ID
 * @returns Promise resolving to job or null if not found
 */
export async function fetchJobById(id: string): Promise<Job | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return MOCK_JOBS.find((job) => job.id === id) || null
}

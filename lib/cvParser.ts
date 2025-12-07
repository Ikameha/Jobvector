import type { ExperienceLevel } from "./types"

export interface ExtractedSkill {
    name: string
    confidence: number
}

export interface CVExtractionResult {
    skills: ExtractedSkill[]
    softSkills: string[]
    experienceLevel: ExperienceLevel
    yearsOfExperience: number
}

const TECH_SKILLS = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Vue.js", "Angular",
    "Python", "Django", "Flask", "FastAPI",
    "Java", "Spring Boot", "Kotlin",
    "C++", "C#", ".NET", "Go", "Rust",
    "SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP",
    "Git", "CI/CD", "Jenkins", "GitHub Actions",
    "REST API", "GraphQL", "Microservices",
    "Agile", "Scrum", "TDD", "Unit Testing"
]

const SOFT_SKILLS = [
    "Leadership", "Communication", "Problem Solving",
    "Team Collaboration", "Project Management",
    "Critical Thinking", "Adaptability", "Time Management",
    "Mentoring", "Stakeholder Management"
]

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function selectRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

export async function mockExtractSkillsFromCV(
    file: File
): Promise<CVExtractionResult> {
    // Simulate processing delay (2-3 seconds)
    await delay(2000 + Math.random() * 1000)

    // Select 8-15 random tech skills
    const numSkills = 8 + Math.floor(Math.random() * 8)
    const selectedSkills = selectRandomItems(TECH_SKILLS, numSkills)

    // Generate confidence scores (80-95%)
    const skillsWithConfidence: ExtractedSkill[] = selectedSkills.map(skill => ({
        name: skill,
        confidence: 80 + Math.floor(Math.random() * 16)
    }))

    // Add 2-4 soft skills
    const numSoftSkills = 2 + Math.floor(Math.random() * 3)
    const softSkills = selectRandomItems(SOFT_SKILLS, numSoftSkills)

    // Estimate experience level from file size (mock logic)
    const fileSize = file.size
    let experienceLevel: ExperienceLevel
    let yearsOfExperience: number

    if (fileSize > 100000) {
        experienceLevel = "senior"
        yearsOfExperience = 7 + Math.floor(Math.random() * 6) // 7-12 years
    } else if (fileSize > 50000) {
        experienceLevel = "mid"
        yearsOfExperience = 3 + Math.floor(Math.random() * 4) // 3-6 years
    } else {
        experienceLevel = "entry"
        yearsOfExperience = 1 + Math.floor(Math.random() * 2) // 1-2 years
    }

    return {
        skills: skillsWithConfidence,
        softSkills,
        experienceLevel,
        yearsOfExperience
    }
}

export function validateCVFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Please upload a PDF or Word document (.pdf, .doc, .docx)'
        }
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'File size must be less than 5MB'
        }
    }

    return { valid: true }
}

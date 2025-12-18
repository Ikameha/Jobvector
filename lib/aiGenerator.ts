import { Job, Profile } from "./types"

export async function generateCoverLetter(job: Job, profile: Profile): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const matchingSkills = job.requiredSkills.filter(skill =>
        profile.skills.some(ps => ps.toLowerCase() === skill.toLowerCase())
    )

    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    return `
[Your Name]
${profile.locationPreferences?.[0] || "[Your Location]"}
${"[Your Email]"}
${date}

Hiring Manager
${job.company}
${job.location}

**Re: Application for ${job.title} Position**

Dear Hiring Team at ${job.company},

I am writing to express my enthusiastic interest in the **${job.title}** role. With my background in **Software Engineering** and a strong focus on **${matchingSkills.slice(0, 3).join(', ') || "innovation"}**, I am confident in my ability to contribute effectively to your team.

What draws me to ${job.company} is your commitment to excellence and innovation in the industry. My experience aligns perfectly with your needs, particularly:

*   **Verified Skills:** My proficiency in **${matchingSkills.join(', ')}** directly matches your core requirements.
*   **Experience Level:** As a **${profile.experienceLevel}** professional with **${profile.yearsOfExperience} years** of experience, I bring the ${job.experienceLevel} expertise you are looking for.
*   **Driven by Impact:** I am eager to apply my skills to help ${job.company} achieve its goals.

I would welcome the opportunity to discuss how my background and enthusiasm would translate into success for your team. Thank you for considering my application.

Sincerely,

[Your Name]
`
}

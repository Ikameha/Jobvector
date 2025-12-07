export interface QuestionOption {
    id: string
    icon: string
    title: string
    description: string
}

export interface Question {
    id: number
    question: string
    options: QuestionOption[]
}

export const QUESTIONNAIRE: Question[] = [
    {
        id: 1,
        question: "What drives you most in your career?",
        options: [
            {
                id: "innovation",
                icon: "🚀",
                title: "Innovation & Impact",
                description: "Building products that change how people work",
            },
            {
                id: "financial",
                icon: "💰",
                title: "Financial Growth",
                description: "Maximizing earning potential and career advancement",
            },
            {
                id: "mastery",
                icon: "🎯",
                title: "Mastery & Expertise",
                description: "Becoming a recognized expert in my field",
            },
            {
                id: "team",
                icon: "🤝",
                title: "Team & Culture",
                description: "Working with amazing people in a great environment",
            },
            {
                id: "balance",
                icon: "⚖️",
                title: "Work-Life Balance",
                description: "Flexibility and time for personal life",
            },
        ],
    },
    {
        id: 2,
        question: "What type of company environment excites you?",
        options: [
            {
                id: "early-startup",
                icon: "🌱",
                title: "Early Startup",
                description: "0-20 people - High risk, high reward, wear many hats",
            },
            {
                id: "growth-startup",
                icon: "🚀",
                title: "Growth Startup",
                description: "20-200 people - Fast-paced, scaling challenges",
            },
            {
                id: "established",
                icon: "🏢",
                title: "Established Company",
                description: "200+ people - Stability, structure, resources",
            },
            {
                id: "agency",
                icon: "🎨",
                title: "Agency/Consultancy",
                description: "Variety of projects and clients",
            },
            {
                id: "remote-first",
                icon: "🌍",
                title: "Remote-First",
                description: "Location independence is priority",
            },
        ],
    },
    {
        id: 3,
        question: "How do you measure career success?",
        options: [
            {
                id: "revenue",
                icon: "📈",
                title: "Revenue/Users",
                description: "Direct business impact metrics",
            },
            {
                id: "recognition",
                icon: "🏆",
                title: "Recognition",
                description: "Awards, promotions, industry reputation",
            },
            {
                id: "craft",
                icon: "🛠️",
                title: "Craft Quality",
                description: "Building elegant, well-architected solutions",
            },
            {
                id: "team-growth",
                icon: "👥",
                title: "Team Growth",
                description: "Mentoring others and building teams",
            },
            {
                id: "learning",
                icon: "🎓",
                title: "Learning",
                description: "Continuous skill development and new challenges",
            },
        ],
    },
    {
        id: 4,
        question: "When do you do your best work?",
        options: [
            {
                id: "deep-focus",
                icon: "🧩",
                title: "Deep Focus",
                description: "Long uninterrupted sessions on complex problems",
            },
            {
                id: "fast-iteration",
                icon: "⚡",
                title: "Fast Iteration",
                description: "Quick cycles, rapid feedback, shipping often",
            },
            {
                id: "collaboration",
                icon: "🤝",
                title: "Collaboration",
                description: "Pair programming, brainstorming, team sessions",
            },
            {
                id: "structured",
                icon: "🎯",
                title: "Structured Process",
                description: "Clear requirements, defined workflows",
            },
            {
                id: "flexible",
                icon: "🌊",
                title: "Flexible Rhythm",
                description: "Mix of async work and sync collaboration",
            },
        ],
    },
    {
        id: 5,
        question: "What would make you reject an otherwise perfect job?",
        options: [
            {
                id: "office-requirement",
                icon: "🏢",
                title: "Office Requirement",
                description: "Must be remote or hybrid",
            },
            {
                id: "long-hours",
                icon: "⏰",
                title: "Long Hours",
                description: "Work-life balance is non-negotiable",
            },
            {
                id: "corporate-politics",
                icon: "🎭",
                title: "Corporate Politics",
                description: "Need transparent, flat culture",
            },
            {
                id: "legacy-tech",
                icon: "🛑",
                title: "Legacy Tech",
                description: "Want to work with modern stack",
            },
            {
                id: "below-market",
                icon: "💸",
                title: "Below Market Pay",
                description: "Compensation must be competitive",
            },
        ],
    },
]

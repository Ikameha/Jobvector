export interface LocationOption {
  id: string
  label: string
  workMode: "remote" | "hybrid" | "onsite"
}

export const LOCATION_QUIZ_OPTIONS: LocationOption[] = [
  {
    id: "full-remote-worldwide",
    label: "Full Remote – Worldwide",
    workMode: "remote",
  },
  {
    id: "remote-europe",
    label: "Remote – Europe only",
    workMode: "remote",
  },
  {
    id: "remote-us",
    label: "Remote – United States only",
    workMode: "remote",
  },
  {
    id: "paris-hybrid",
    label: "Paris – Hybrid (2-3 days/week)",
    workMode: "hybrid",
  },
  {
    id: "london-hybrid",
    label: "London – Hybrid (2-3 days/week)",
    workMode: "hybrid",
  },
  {
    id: "lyon-onsite",
    label: "Lyon – Onsite (4-5 days/week)",
    workMode: "onsite",
  },
  {
    id: "san-francisco-onsite",
    label: "San Francisco – Onsite",
    workMode: "onsite",
  },
  {
    id: "berlin-hybrid",
    label: "Berlin – Hybrid",
    workMode: "hybrid",
  },
]

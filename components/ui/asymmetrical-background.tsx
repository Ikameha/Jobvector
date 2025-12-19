"use client"

export function AsymmetricalBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{
                background: `
          radial-gradient(
            800px circle at 20% 30%,
            rgba(59,130,246,0.12),
            transparent 60%
          ),
          radial-gradient(
            600px circle at 80% 60%,
            rgba(245,158,11,0.06),
            transparent 55%
          ),
          #F8FAFC
        `
            }}
        />
    )
}

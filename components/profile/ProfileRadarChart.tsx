"use client"

import { GlassCard } from "@/components/ui/glass-card"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

const data = [
    {
        subject: "Technical",
        A: 120,
        fullMark: 150,
    },
    {
        subject: "Soft Skills",
        A: 98,
        fullMark: 150,
    },
    {
        subject: "Experience",
        A: 86,
        fullMark: 150,
    },
    {
        subject: "Culture",
        A: 99,
        fullMark: 150,
    },
    {
        subject: "Leadership",
        A: 85,
        fullMark: 150,
    },
]

export function ProfileRadarChart() {
    return (
        <GlassCard intensity="medium" className="p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full" />
                Profile Analysis
            </h3>
            <div className="h-[350px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{
                                fill: "rgba(255,255,255,0.9)",
                                fontSize: 13,
                                fontWeight: 600,
                                dy: 4
                            }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="My Profile"
                            dataKey="A"
                            stroke="#3D7CFF"
                            strokeWidth={3}
                            fill="#3D7CFF"
                            fillOpacity={0.4}
                            dot={{ r: 4, fill: "#3D7CFF", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6, fill: "#00E1FF", stroke: "#fff" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(10, 10, 10, 0.9)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(61, 124, 255, 0.3)",
                                borderRadius: "12px",
                                color: "#fff",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                            }}
                            itemStyle={{ color: "#00E1FF", fontWeight: 600 }}
                            cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
                        />
                    </RadarChart>
                </ResponsiveContainer>

                {/* Legend/Key */}
                <div className="absolute bottom-0 right-0 text-xs text-muted-foreground bg-background/50 backdrop-blur px-2 py-1 rounded-md border border-white/5">
                    Scale: 0-150
                </div>
            </div>
        </GlassCard>
    )
}

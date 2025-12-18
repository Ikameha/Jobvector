import { Profile } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChefHat, Utensils, LayoutGrid, MapPin, DollarSign, BrainCircuit } from "lucide-react"
import { ProfileRadarChart } from "./ProfileRadarChart"

interface ProfileDetailsProps {
    profile: Profile
    onEdit: () => void
}

export function ProfileDetails({ profile, onEdit }: ProfileDetailsProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button variant="outline" onClick={onEdit} className="gap-2">
                    Edit Profile
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Skills & Radar Chart */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <BrainCircuit className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Skills & Expertise</CardTitle>
                                    <CardDescription>Your technical competencies</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {profile.skills.map((skill, i) => (
                                    <Badge
                                        key={skill}
                                        variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "outline"}
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            {/* Interactive Radar - Placeholder for now until implemented fully */}
                            <div className="mt-4 pt-4 border-t border-border">
                                <h4 className="text-sm font-medium mb-4 text-muted-foreground">Competency Map</h4>
                                <div className="bg-muted/30 rounded-xl p-4 flex justify-center">
                                    <ProfileRadarChart />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Cultural Values */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-secondary/10 rounded-lg">
                                    <Utensils className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Cultural Values</CardTitle>
                                    <CardDescription>What matters most to you</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {profile.culturalValues.map((value) => (
                                    <Badge key={value} variant="outline" className="px-3 py-1 border-secondary/30 bg-secondary/5 text-secondary-foreground">
                                        {value}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Work Preferences */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <LayoutGrid className="w-5 h-5 text-accent-foreground" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Work Preferences</CardTitle>
                                    <CardDescription>Your ideal environment</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Work Mode</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.workModePreferences.map((mode) => (
                                        <Badge key={mode} className="capitalize bg-accent text-accent-foreground hover:bg-accent/90">
                                            {mode}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Company Types</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.companyTypePreferences.map((type) => (
                                        <Badge key={type} variant="secondary" className="capitalize">
                                            {type}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location & Salary */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-chart-1/10 rounded-lg">
                                    <MapPin className="w-5 h-5 text-chart-1" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Location & Compensation</CardTitle>
                                    <CardDescription>Where and how much</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Preferred Locations</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.locationPreferences.map((location) => (
                                        <Badge key={location} variant="outline" className="gap-1">
                                            <MapPin className="w-3 h-3 text-muted-foreground" />
                                            {location}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Salary Range</p>
                                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                    <DollarSign className="w-5 h-5 text-green-500" />
                                    ${profile.salaryMin.toLocaleString('en-US')} - ${profile.salaryMax.toLocaleString('en-US')}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

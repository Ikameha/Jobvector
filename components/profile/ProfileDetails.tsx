"use client"

import { Profile } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProfileDetailsProps {
    profile: Profile
    onEdit: () => void
}

export function ProfileDetails({ profile, onEdit }: ProfileDetailsProps) {
    return (
        <div className="grid gap-6">
            {/* Header Card */}
            <Card className="border-2">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl">{profile.name}</CardTitle>
                            <CardDescription className="text-base flex items-center gap-2">
                                <Badge variant="outline" className="font-medium">
                                    {profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}
                                </Badge>
                                <span>•</span>
                                <span>{profile.yearsOfExperience} years experience</span>
                            </CardDescription>
                        </div>
                        <Button variant="outline" onClick={onEdit} className="gap-2">
                            Edit Profile
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Skills & Expertise</CardTitle>
                        <CardDescription>Your technical competencies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-3 py-1">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Cultural Values */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Cultural Values</CardTitle>
                        <CardDescription>What matters most to you</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {profile.culturalValues.map((value) => (
                                <Badge key={value} variant="outline" className="px-3 py-1">
                                    {value}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Work Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Work Preferences</CardTitle>
                        <CardDescription>Preferred work arrangements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1.5">Work Mode</p>
                            <div className="flex flex-wrap gap-2">
                                {profile.workModePreferences.map((mode) => (
                                    <Badge key={mode} className="capitalize">
                                        {mode}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1.5">Company Types</p>
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
                        <CardTitle className="text-base">Location & Compensation</CardTitle>
                        <CardDescription>Where and how much</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1.5">Preferred Locations</p>
                            <div className="flex flex-wrap gap-2">
                                {profile.locationPreferences.map((location) => (
                                    <Badge key={location} variant="outline">
                                        {location}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1.5">Salary Range</p>
                            <p className="text-lg font-semibold">
                                ${profile.salaryMin.toLocaleString('en-US')} - ${profile.salaryMax.toLocaleString('en-US')} per year
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

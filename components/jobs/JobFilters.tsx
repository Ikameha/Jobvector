"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface JobFiltersProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    salaryRange: [number, number]
    onSalaryChange: (value: [number, number]) => void
    selectedWorkModes: string[]
    onWorkModeChange: (mode: string) => void
    onClearFilters: () => void
}

export function JobFilters({
    searchQuery,
    onSearchChange,
    salaryRange,
    onSalaryChange,
    selectedWorkModes,
    onWorkModeChange,
    onClearFilters
}: JobFiltersProps) {
    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search jobs..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Reset
                    </Button>
                </div>

                {/* Work Mode */}
                <div className="space-y-3">
                    <Label className="text-xs uppercase text-muted-foreground font-semibold">Work Mode</Label>
                    <div className="space-y-2">
                        {['remote', 'hybrid', 'onsite'].map((mode) => (
                            <div key={mode} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`mode-${mode}`}
                                    checked={selectedWorkModes.includes(mode)}
                                    onCheckedChange={() => onWorkModeChange(mode)}
                                />
                                <Label htmlFor={`mode-${mode}`} className="capitalize cursor-pointer font-normal text-sm">
                                    {mode}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs uppercase text-muted-foreground font-semibold">Min Salary</Label>
                        <span className="text-xs text-muted-foreground">${(salaryRange[0] / 1000).toFixed(0)}k+</span>
                    </div>
                    <Slider
                        defaultValue={[salaryRange[0]]}
                        max={200000}
                        min={30000}
                        step={5000}
                        value={[salaryRange[0]]}
                        onValueChange={(vals) => onSalaryChange([vals[0], salaryRange[1]])}
                        className="py-2"
                    />
                </div>
            </div>
        </div>
    )
}

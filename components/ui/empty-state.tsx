import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
    icon?: LucideIcon
    title: string
    description: string
    action?: React.ReactNode
    className?: string
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border/50 bg-muted/5 animate-in fade-in-50 zoom-in-95 duration-500",
                className
            )}
        >
            {Icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4 opacity-80">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
                {description}
            </p>
            {action && <div>{action}</div>}
        </div>
    )
}

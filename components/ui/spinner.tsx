import * as React from "react"
import { Loader2Icon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-8",
        lg: "size-12",
        xl: "size-16",
      },
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

interface SpinnerProps extends React.ComponentProps<'svg'>, VariantProps<typeof spinnerVariants> { }

function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  )
}

export { Spinner }

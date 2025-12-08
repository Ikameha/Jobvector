import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-input bg-background/50 backdrop-blur-sm shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors',
        secondary:
          'bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 hover:border-secondary/30 shadow-sm',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 shadow-sm transition-all',
        neon: 'bg-primary/5 border border-primary/30 text-primary shadow-[0_0_10px_rgba(61,124,255,0.1)] hover:shadow-[0_0_20px_rgba(61,124,255,0.25)] hover:bg-primary/10 hover:border-primary/50 transition-all duration-300',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-8 has-[>svg]:px-4 text-base',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-semibold font-body transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Gold primary - main CTA button
        default: 'bg-gold text-white shadow-sm hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
        // Navy outline - secondary actions
        outline: 'border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2',
        // Navy solid - alternate primary
        navy: 'bg-navy text-white shadow-sm hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2',
        // Ghost - minimal actions
        ghost: 'hover:bg-gray-100 text-gray-600 hover:text-navy',
        // Link style
        link: 'text-gold underline-offset-4 hover:underline hover:text-gold-light',
      },
      size: {
        clear: '',
        sm: 'h-9 px-4 py-2 text-xs',
        default: 'h-12 px-6 py-3 text-sm',
        lg: 'h-14 px-8 py-4 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
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

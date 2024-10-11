import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'flex items-center justify-center transition-colors duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 z-10 font-semibold',
	{
		variants: {
			variant: {
				default: 'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/80',
				destructive:
					'bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
				outline:
					'text-gray-50 relative overflow-hidden outline outline-1 outline-gray-50 transition-all duration-300 ease-in-out before:content-[""] before:absolute before:z-[-1] before:left-[-20%] before:right-[-20%] before:top-0 before:bottom-0 before:bg-gray-50 before:skew-x-[-45deg] before:scale-x-[0] before:transition-transform before:duration-300 before:ease-in-out hover:text-neutral-900 hover:outline-none hover:before:scale-x-[0.75] active:scale-[0.9]',
				secondary:
					'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
				ghost: 'hover:bg-neutral-100',
				link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
			},
			size: {
				default: 'px-10 py-2',
				sm: 'rounded-md px-3 text-xs',
				lg: 'rounded-md px-8',
				icon: 'h-min w-min',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }

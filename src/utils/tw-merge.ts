import { clsx, type ClassValue } from 'clsx'
import { twMerge as merge } from 'tailwind-merge'

export default function twMerge(...inputs: ClassValue[]): string {
	return merge(clsx(inputs))
}

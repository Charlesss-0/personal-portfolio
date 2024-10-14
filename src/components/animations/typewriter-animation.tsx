import { useEffect, useState } from 'react'

import { twMerge } from '@/utils'

interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: string
}

export default function Typewriter({ children, className }: TypewriterProps): React.ReactNode {
	const [currentText, setCurrentText] = useState<string>('')
	const [direction, setDirection] = useState<number>(1) // 1 for forward, -1 for backward
	const [index, setIndex] = useState<number>(0)
	const delay = 5000

	useEffect(() => {
		const interval = setInterval(() => {
			if (direction === 1) {
				if (index === children.length) {
					setTimeout(() => {
						setDirection(-1) // Change direction to go backward after delay
					}, delay)
				} else {
					setCurrentText(children.slice(0, index + 1))
					setIndex(index + 1)
				}
			} else {
				if (index === 0) {
					setTimeout(() => {
						setDirection(1) // Change direction to go forward after delay
					}, delay)
				} else {
					setCurrentText(children.slice(0, index - 1))
					setIndex(index - 1)
				}
			}
		}, 50)

		return (): void => clearInterval(interval)
	}, [children, index, direction])

	return (
		<div className="flex items-center h-24 gap-2 w-max">
			<p className={twMerge('font-semibold text-8xl text-neutral-200', className)}>{currentText}</p>

			<div className="w-5 h-[90%] animate-blink bg-light-blue" />
		</div>
	)
}

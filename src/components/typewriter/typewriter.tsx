import React, { useEffect, useState } from 'react'

import { Cursor } from './typewriter.styles'

interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
	text: string
}

export default function Typewriter({ text, ...props }: TypewriterProps): React.ReactNode {
	const [currentText, setCurrentText] = useState<string>('')
	const [direction, setDirection] = useState<number>(1) // 1 for forward, -1 for backward
	const [index, setIndex] = useState<number>(0)
	const delay: number = 10000

	useEffect(() => {
		const interval = setInterval(() => {
			if (direction === 1) {
				if (index === text.length) {
					setTimeout(() => {
						setDirection(-1) // Change direction to go backward after delay
					}, delay)
				} else {
					setCurrentText(text.slice(0, index + 1))
					setIndex(index + 1)
				}
			} else {
				if (index === 0) {
					setTimeout(() => {
						setDirection(1) // Change direction to go forward after delay
					}, delay)
				} else {
					setCurrentText(text.slice(0, index - 1))
					setIndex(index - 1)
				}
			}
		}, 50)

		return () => clearInterval(interval)
	}, [text, index, direction])

	return (
		<div className="flex gap-2 items-center w-max h-32 md:h-12">
			<span {...props}>{currentText}</span>
			<Cursor />
		</div>
	)
}

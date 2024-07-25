import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
	text: string
}

const blink = keyframes`
	25% {
		opacity: 0;
	}

	75% {
		opacity: 1;
	}
`

const Cursor = styled.div`
	width: 3.5px;
	height: 50%;
	background: #efefef;
	border-radius: 50rem;
	animation: ${blink} 1.3s infinite;
`

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
		<div className="flex gap-[0.5rem] items-center w-[max-content] h-[7.7rem] md:h-[3.3rem]">
			<span {...props}>{currentText}</span>
			<Cursor />
		</div>
	)
}

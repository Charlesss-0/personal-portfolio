import { useEffect, useRef } from 'react'

import { Card } from './projectCard.styles'
import VanillaTilt from 'vanilla-tilt'

interface CardProps {
	img: string
	alt: string
}

export default function ProjectCard({ img, alt }: CardProps) {
	const divRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const div = divRef.current

		VanillaTilt.init(div as HTMLElement, {
			max: 10,
			speed: 100,
			glare: true,
			'max-glare': 0.4,
		})
	}, [])

	return (
		<Card ref={divRef}>
			<div className="bg-neutral mx-[-0.5rem]">
				<img src={img} alt={alt} draggable={false} className="object-cover select-none" />
			</div>
		</Card>
	)
}

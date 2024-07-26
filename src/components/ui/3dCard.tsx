import { useEffect, useRef } from 'react'

import VanillaTilt from 'vanilla-tilt'
import styled from 'styled-components'

interface CardProps {
	img: string
	alt: string
}

const Card = styled.div`
	position: relative;
	transform-style: preserve-3d;
	overflow: hidden;
	border-radius: 1rem;

	&:hover {
		box-shadow: 0 0 50px #fff3, 0 0 50px #fff3, 0 0 50px #fff3;
	}
`

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

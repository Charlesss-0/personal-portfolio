import { useEffect, useRef } from 'react'

import VanillaTilt from 'vanilla-tilt'
import styled from 'styled-components'

const Box = styled.div`
	position: relative;
	transform-style: preserve-3d;
	overflow: hidden;
	border-radius: 1rem;

	&:hover {
		box-shadow: 0 0 50px #fff3, 0 0 50px #fff3, 0 0 50px #fff3;
	}
`

interface CardProps {
	img: string
	alt: string
}

export default function Card({ img, alt }: CardProps) {
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
		<Box ref={divRef}>
			<div className="bg-[#fff3] mx-[-0.5rem]">
				<img src={img} alt={alt} draggable={false} className="object-cover select-none" />
			</div>
		</Box>
	)
}

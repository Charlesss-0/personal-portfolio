import React, { Suspense, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'

import { Button } from '../button'
import Model from './model-test'

interface SectionProps {
	name: string
	description: string
	img: string
	url: string
	color: string
	className: string
}

const Section: React.FC<SectionProps> = ({ name, description, img, url, color, className }) => {
	const container = useRef<HTMLDivElement | null>(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start'],
	})

	return (
		<motion.div
			ref={container}
			className={`sticky top-0 flex h-screen text-base-100 ${className}`}
			style={{
				backgroundColor: color,
				backgroundImage: 'radial-gradient(#efefef 1px, transparent 0)',
				backgroundSize: '40px 40px',
				backgroundPosition: '-5px -5px',
				backgroundAttachment: 'fixed',
			}}
		>
			<motion.div style={{ scale: scrollYProgress }} className="flex w-full">
				<div className="flex flex-col items-center justify-center flex-1 gap-10 text-center">
					<h1 className="text-5xl md:text-2xl">{name}</h1>

					<p className="w-[50%] text-md md:w-full md:text-sm">{description}</p>

					<a href={url} target="_blank">
						<Button>View Project</Button>
					</a>
				</div>

				<div className="flex-1">
					<Suspense fallback={null}>
						<div className="w-full h-full">
							<Model modelPath="/models/macbook-pro.glb" modelTexture={img} />
						</div>
					</Suspense>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default Section

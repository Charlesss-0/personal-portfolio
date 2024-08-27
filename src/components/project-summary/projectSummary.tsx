import { MotionProps, motion, useScroll, useTransform } from 'framer-motion'
import React, { Suspense, useRef } from 'react'

import { Button } from '../button'
import { Model } from '../threejs'

type ProjectSummaryProps = React.HTMLProps<HTMLDivElement> &
	MotionProps & {
		name: string
		description: string
		img: string
		url: string
	}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
	name,
	description,
	img,
	url,
	className,
}) => {
	const container = useRef<HTMLDivElement | null>(null)

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start'],
	})

	const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])

	return (
		<motion.div ref={container} style={{ scale }} className={`flex w-full z-10 ${className}`}>
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
	)
}

export default ProjectSummary

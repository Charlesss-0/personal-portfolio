'use client'

import { useEffect, useRef, useState } from 'react'

import ProjectButton from './ProjectButton'
import ProjectContent from './ProjectContent'
import ProjectHeader from './ProjectHeader'
import ProjectModel from './ProjectModel'
import { twMerge } from '@/utils'
import { useInViewport } from '@/hooks'

interface ProjectSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string
	name: string
	description: string
	img: string
	stack: string[]
	url: string
	model: string
	btnText: string
	index: number
}

export default function ProjectSummary({
	id,
	name,
	description,
	img,
	stack,
	url,
	model,
	btnText,
	index,
	className,
}: ProjectSummaryProps): React.ReactNode {
	const containerRef = useRef<HTMLDivElement>(null)
	const isInViewport = useInViewport(containerRef, false, { threshold: 0.7 })
	const [animationTriggered, setAnimationTriggered] = useState(false)

	useEffect(() => {
		if (isInViewport && !animationTriggered) {
			setAnimationTriggered(true)
		}
	}, [isInViewport, animationTriggered])

	return (
		<div
			ref={containerRef}
			id={id}
			className={twMerge('flex z-10 w-full h-screen md:flex-col', className)}
		>
			<div className="z-10 flex items-center justify-center flex-1">
				<div className="flex flex-col items-start justify-center w-4/5">
					<ProjectHeader index={index} animationTriggered={animationTriggered} />
					<ProjectContent
						name={name}
						description={description}
						stack={stack}
						animationTriggered={animationTriggered}
					/>
					<ProjectButton url={url} btnText={btnText} animationTriggered={animationTriggered} />
				</div>
			</div>

			<ProjectModel model={model} img={img} />
		</div>
	)
}

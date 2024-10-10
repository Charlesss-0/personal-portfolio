import React, { Suspense } from 'react'

import { Button } from '../button'
import { Model } from '../threejs'
import { type MotionProps } from 'framer-motion'

type ProjectSummaryProps = React.HTMLProps<HTMLDivElement> &
	MotionProps & {
		name: string
		description: string
		img: string
		url: string
		model: string
		btnText: string
	}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
	name,
	description,
	img,
	url,
	model,
	btnText,
	className,
}) => {
	return (
		<div className={`flex z-10 w-full h-full md:flex-col ${className}`}>
			<div className="z-10 flex flex-col items-center justify-center flex-1 gap-10 text-center">
				<h1 className="text-5xl md:text-2xl">{name}</h1>

				<p className="w-[50%] text-md md:w-full md:text-sm">{description}</p>

				<a href={url}>
					<Button>{btnText}</Button>
				</a>
			</div>

			<div className="z-10 flex-1">
				<Suspense fallback={null}>
					<div className="w-full h-full">
						<Model modelPath={model} modelTexture={img} />
					</div>
				</Suspense>
			</div>
		</div>
	)
}

export default ProjectSummary

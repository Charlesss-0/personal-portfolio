import { Suspense } from 'react'

import { Button } from '@/components/ui'
import { ProjectModel } from '@/components/models'
import { type MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type ProjectSummaryProps = React.HTMLProps<HTMLDivElement> &
	MotionProps & {
		name: string
		description: string
		img: string
		url: string
		model: string
		btnText: string
	}

export default function ProjectSummary({
	name,
	description,
	img,
	url,
	model,
	btnText,
	className,
}: ProjectSummaryProps): React.ReactNode {
	return (
		<div className={cn('flex z-10 w-full h-full md:flex-col', className)}>
			<div className="z-10 flex flex-col items-center justify-center flex-1 gap-10 text-center">
				<h1 className="text-5xl md:text-2xl font-semibold">{name}</h1>

				<p className="w-[50%] text-lg md:w-full md:text-sm">{description}</p>

				<Button variant="outline" asChild>
					<a href={url}>{btnText}</a>
				</Button>
			</div>

			<div className="z-10 flex-1">
				<div className="w-full h-full">
					<Suspense fallback={null}>
						<ProjectModel modelPath={model} modelTexture={img} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}

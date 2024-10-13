import { Button } from '@/components/ui'
import { DeviceModel } from '@/components/models'
import { Suspense } from 'react'
import { twMerge } from '@/utils'

interface ProjectSummaryProps {
	name: string
	description: string
	img: string
	url: string
	model: string
	btnText: string
	id: string
	className?: string
}

export default function ProjectSummary({
	name,
	description,
	img,
	url,
	model,
	btnText,
	id,
	className,
}: ProjectSummaryProps): React.ReactNode {
	return (
		<div id={id} className={twMerge('flex z-10 w-full h-full md:flex-col', className)}>
			<div className="z-10 flex flex-col items-center justify-center flex-1 gap-10 text-center">
				<h1 className="text-5xl font-semibold md:text-2xl">{name}</h1>

				<p className="w-[50%] text-lg md:w-full md:text-sm">{description}</p>

				<Button variant="outline" asChild>
					<a href={url}>{btnText}</a>
				</Button>
			</div>

			<div className="z-10 flex-1">
				<div className="w-full h-full">
					<Suspense fallback={null}>
						<DeviceModel modelPath={model} modelTexture={img} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}

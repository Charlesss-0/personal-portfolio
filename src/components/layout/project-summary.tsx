'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui'
import { LoaderAnimation } from '../animations'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { twMerge } from '@/utils'
import { useInViewport } from '@/hooks'

interface ProjectSummaryProps {
	name: string
	description: string
	img: string
	url: string
	model: string
	btnText: string
	id: string
	index: number
	className?: string
}

const DeviceModel = dynamic(() => import('@/components/models/device-model'), {
	ssr: true,
})

export default function ProjectSummary({
	name,
	description,
	img,
	url,
	model,
	btnText,
	id,
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

	const itemVariants = useMemo(
		() => ({
			hidden: { opacity: 0, y: 50 },
			visible: (i: number): Record<string, any> => ({
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					stiffness: 40,
					damping: 10,
					delay: i * 0.2,
				},
			}),
		}),
		[]
	)

	return (
		<div
			ref={containerRef}
			id={id}
			className={twMerge('flex z-10 w-full h-screen md:flex-col', className)}
		>
			<div className="z-10 flex items-center justify-center flex-1 gap-10 px-2 text-center">
				<div className="flex flex-col items-start justify-center w-3/5 gap-10">
					<motion.div
						className="flex items-center w-full"
						variants={itemVariants}
						initial="hidden"
						animate={animationTriggered ? 'visible' : 'hidden'}
						custom={0}
					>
						<div className="flex-[2]">
							<div className="w-full border-b-2 border-light-blue" />

							<div
								className="w-32 h-3 bg-light-blue"
								style={{
									clipPath: 'polygon(0 -1px, 100% -1px, calc(100% - 10px) 100%, 10px 100%)',
								}}
							/>
						</div>

						<p className="flex-1 text-xl font-semibold text-light-blue">0{index}</p>
					</motion.div>

					<div className="flex flex-col items-start gap-5">
						<motion.h2
							className="text-4xl font-bold md:text-2xl text-start"
							variants={itemVariants}
							initial="hidden"
							animate={animationTriggered ? 'visible' : 'hidden'}
							custom={1}
						>
							{name}
						</motion.h2>

						<motion.p
							className="text-xl font-semibold md:w-full md:text-sm text-start text-neutral-400"
							variants={itemVariants}
							initial="hidden"
							animate={animationTriggered ? 'visible' : 'hidden'}
							custom={2}
						>
							{description}
						</motion.p>
					</div>

					<motion.div
						variants={itemVariants}
						initial="hidden"
						animate={animationTriggered ? 'visible' : 'hidden'}
						custom={3}
					>
						<Button variant="outline" className="text-xl" asChild>
							<a href={url}>{btnText}</a>
						</Button>
					</motion.div>
				</div>
			</div>

			<div className="z-10 flex-1">
				<div className="w-full h-full">
					<Suspense fallback={<LoaderAnimation />}>
						<DeviceModel modelPath={model} modelTexture={img} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}

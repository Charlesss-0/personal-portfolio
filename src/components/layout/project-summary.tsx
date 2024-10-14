import { Suspense, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui'
import { DeviceModel } from '@/components/models'
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
	const containerRef = useRef<HTMLDivElement>(null)
	const isInViewport = useInViewport(containerRef, false, { threshold: 0.7 })
	const [animationTriggered, setAnimationTriggered] = useState(false)

	useEffect(() => {
		if (isInViewport && !animationTriggered) {
			setAnimationTriggered(true)
		}
	}, [isInViewport, animationTriggered])

	const itemVariants = {
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
	}

	return (
		<div
			ref={containerRef}
			id={id}
			className={twMerge('flex z-10 w-full h-screen md:flex-col', className)}
		>
			<div className="z-10 flex flex-col items-center justify-center flex-1 gap-10 text-center px-2">
				<motion.h2
					className="text-5xl font-semibold md:text-2xl"
					variants={itemVariants}
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					custom={0}
				>
					{name}
				</motion.h2>

				<motion.p
					className="w-3/5 text-xl md:w-full md:text-sm"
					variants={itemVariants}
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					custom={1}
				>
					{description}
				</motion.p>

				<motion.div
					variants={itemVariants}
					initial="hidden"
					animate={animationTriggered ? 'visible' : 'hidden'}
					custom={2}
				>
					<Button variant="outline" className="text-xl" asChild>
						<a href={url}>{btnText}</a>
					</Button>
				</motion.div>
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

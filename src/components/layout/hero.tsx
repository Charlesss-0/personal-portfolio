import { MouseIconAnimation, TypewriterAnimation } from '@/components/animations'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '../ui'
import { VscGithub } from 'react-icons/vsc'
import config from '@/data/config.json'
import { useLenisScroll } from '@/hooks'
import { useRef } from 'react'

export default function Hero(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { scrollTo } = useLenisScroll()

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['end end', 'center start'],
	})

	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

	return (
		<div
			ref={containerRef}
			className="relative flex flex-col justify-end w-full h-screen select-none text-base-100"
		>
			<div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
				<div className="px-5">
					<h1 className="text-5xl text-neutral-200 text-neutral mb-5">Carlos Aragon</h1>
				</div>

				<div className="flex px-5">
					<TypewriterAnimation>{config.role}</TypewriterAnimation>
				</div>
			</div>

			<Button
				variant="ghost"
				className="absolute rounded-full cursor-pointer bottom-10 left-10 hover:bg-transparent"
				size="icon"
				asChild
			>
				<a href={config.github} rel="noreferrer" target="_blank">
					<VscGithub className="text-5xl transition-all duration-300 ease-in-out fill-neutral-200 hover:fill-neutral-400" />
				</a>
			</Button>

			<motion.div
				style={{
					opacity: opacity,
				}}
			>
				<MouseIconAnimation onclick={() => scrollTo('#places-finder')} />
			</motion.div>
		</div>
	)
}

import { container, name } from './hero-variants'
import { useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/ui'
import { Icon } from '@iconify-icon/react'
import MouseIndicator from './MouseIndicator'
import Typewriter from './Typewriter'
import config from '@/data/config.json'
import { motion } from 'framer-motion'
import { useLenisScroll } from '@/hooks'
import { useRef } from 'react'

export default function Hero(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { scrollTo } = useLenisScroll()

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['end', 'center start'],
	})

	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
	const display = useTransform(scrollYProgress, [0, 0.5], ['block', 'none'])
	const translateY = useTransform(scrollYProgress, [0, 0.5], [0, 50])

	return (
		<>
			<motion.div
				ref={containerRef}
				className="relative flex flex-col justify-end w-full h-screen select-none text-base-100"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
					<div className="flex justify-start px-5">
						<h1 className="relative self-start mb-5 overflow-hidden text-5xl tracking-wider text-neutral-400">
							Carlos Aragon
							<motion.div
								className="absolute top-0 left-0 z-10 w-full h-full bg-light-blue"
								variants={name}
								initial="initial"
								animate="animate"
							/>
						</h1>
					</div>

					<div className="flex px-5">
						<Typewriter>{config.role}</Typewriter>
					</div>
				</div>
			</motion.div>

			<Button variant="ghost" size="icon" className="fixed rounded-full bottom-10 left-10" asChild>
				<motion.div
					style={{
						opacity,
						display,
						translateY,
					}}
					variants={container}
					initial="hidden"
					animate="visible"
				>
					<a href={config.github} rel="noreferrer" target="_blank">
						<Icon
							icon="codicon:github"
							className="flex items-center justify-center transition-all duration-300 ease-in-out text-neutral-200 hover:text-neutral-400"
							width={40}
							height={40}
							size={40}
						/>
					</a>
				</motion.div>
			</Button>

			<Button
				size="icon"
				variant="ghost"
				className="fixed left-1/2 translate-x-[-50%] bottom-10"
				onClick={() => scrollTo('#pixelsketch')}
				asChild
			>
				<motion.div
					style={{
						opacity,
						display,
						translateY,
					}}
					variants={container}
					initial="hidden"
					animate="visible"
				>
					<MouseIndicator />
				</motion.div>
			</Button>
		</>
	)
}

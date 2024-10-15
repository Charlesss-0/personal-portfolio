import { MouseAnimation, TypewriterAnimation } from '@/components/animations'
import { useMemo, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

import { Button } from '../ui'
import { VscGithub } from 'react-icons/vsc'
import config from '@/data/config.json'
import { motion } from 'framer-motion'
import { useLenisScroll } from '@/hooks'

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

	const slideVariants = useMemo(
		() => ({
			initial: { y: '101%' },
			animate: { y: '-101%', transition: { duration: 1, ease: 'easeInOut', type: 'tween' } },
		}),
		[]
	)

	const heroVariants = useMemo(
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
		<>
			<motion.div
				ref={containerRef}
				className="relative flex flex-col justify-end w-full h-screen select-none text-base-100"
				variants={heroVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
					<div className="flex justify-start px-5">
						<h1 className="relative self-start mb-5 overflow-hidden text-5xl text-neutral-400">
							Carlos Aragon
							<motion.div
								className="absolute top-0 left-0 z-10 w-full h-full bg-light-blue"
								variants={slideVariants}
								initial="initial"
								animate="animate"
							/>
						</h1>
					</div>

					<div className="flex px-5">
						<TypewriterAnimation>{config.role}</TypewriterAnimation>
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
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<a href={config.github} rel="noreferrer" target="_blank">
						<VscGithub
							className="transition-all duration-300 ease-in-out fill-neutral-200 hover:fill-neutral-400"
							size={40}
						/>
					</a>
				</motion.div>
			</Button>

			<Button
				size="icon"
				variant="ghost"
				className="fixed left-1/2 translate-x-[-50%] bottom-10"
				onClick={() => scrollTo('#places-finder')}
				asChild
			>
				<motion.div
					style={{
						opacity,
						display,
						translateY,
					}}
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<MouseAnimation />
				</motion.div>
			</Button>
		</>
	)
}

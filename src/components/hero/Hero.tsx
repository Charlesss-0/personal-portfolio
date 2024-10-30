import { containerVariants, overlayVariants } from './hero-constants'

import HeroFooter from './HeroFooter'
import Typewriter from './Typewriter'
import config from '@/data/config.json'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function Hero(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement | null>(null)

	return (
		<>
			<motion.div
				ref={containerRef}
				className="relative flex flex-col justify-end w-full h-screen select-none text-base-100"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
					<div className="flex justify-start px-5">
						<h1 className="relative self-start mb-5 overflow-hidden text-5xl tracking-wider text-neutral-400">
							Carlos Aragon
							<motion.div
								className="absolute top-0 left-0 z-10 w-full h-full bg-light-blue"
								variants={overlayVariants}
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

			<HeroFooter containerRef={containerRef} />
		</>
	)
}

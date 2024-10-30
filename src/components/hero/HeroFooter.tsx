import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/ui'
import { Icon } from '@iconify-icon/react'
import MouseIndicator from './MouseIndicator'
import config from '@/data/config.json'
import { containerVariants } from './hero-constants'
import { useLenisScroll } from '@/hooks'

export default function HeroFooter({
	containerRef,
}: {
	containerRef: React.RefObject<HTMLDivElement>
}): React.ReactNode {
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
			<Button variant="ghost" size="icon" className="fixed rounded-full bottom-10 left-10" asChild>
				<motion.div
					style={{
						opacity,
						display,
						translateY,
					}}
					variants={containerVariants}
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
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<MouseIndicator />
				</motion.div>
			</Button>
		</>
	)
}

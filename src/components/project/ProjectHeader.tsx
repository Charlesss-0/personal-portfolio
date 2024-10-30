import { motion } from 'framer-motion'
import { stagger } from './project-constants'

export default function ProjectHeader({
	index,
	animationTriggered,
}: {
	index: number
	animationTriggered: boolean
}): React.ReactNode {
	return (
		<motion.div
			className="flex items-center justify-between w-full"
			variants={stagger}
			initial="hidden"
			animate={animationTriggered ? 'visible' : 'hidden'}
			custom={0}
		>
			<div className="flex-1">
				<div className="w-full border-b-2 border-light-blue" />

				<div
					className="w-32 h-3 bg-light-blue"
					style={{
						clipPath: 'polygon(0 -1px, 100% -1px, calc(100% - 10px) 100%, 10px 100%)',
					}}
				/>
			</div>

			<p className="w-32 text-xl font-semibold text-center text-light-blue">0{index}</p>
		</motion.div>
	)
}

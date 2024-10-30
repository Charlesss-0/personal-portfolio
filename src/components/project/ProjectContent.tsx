import ProjectHeader from './ProjectHeader'
import StackIcons from './StackIcons'
import { motion } from 'framer-motion'
import { stagger } from './project-constants'

export default function ProjectContent({
	name,
	description,
	stack,
	index,
	animationTriggered,
}: {
	name: string
	description: string
	stack: string[]
	index: number
	animationTriggered: boolean
}): React.ReactNode {
	return (
		<div className="flex flex-col items-start mb-20">
			<motion.h2
				className="text-4xl font-bold md:text-2xl text-start"
				variants={stagger}
				initial="hidden"
				animate={animationTriggered ? 'visible' : 'hidden'}
				custom={0}
			>
				{name}
			</motion.h2>
			<ProjectHeader index={index} animationTriggered={animationTriggered} />

			<motion.p
				className="mb-5 text-xl font-semibold md:w-full md:text-sm text-start text-neutral-400"
				variants={stagger}
				initial="hidden"
				animate={animationTriggered ? 'visible' : 'hidden'}
				custom={2}
			>
				{description}
			</motion.p>

			<StackIcons stack={stack} animationTriggered={animationTriggered} />
		</div>
	)
}

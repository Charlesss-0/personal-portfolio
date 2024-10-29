import StackIcons from './StackIcons'
import { motion } from 'framer-motion'
import { stagger } from './project-variants'

export default function ProjectContent({
	name,
	description,
	stack,
	animationTriggered,
}: {
	name: string
	description: string
	stack: string[]
	animationTriggered: boolean
}): React.ReactNode {
	return (
		<div className="flex flex-col items-start mb-20">
			<motion.h2
				className="my-10 text-4xl font-bold md:text-2xl text-start"
				variants={stagger}
				initial="hidden"
				animate={animationTriggered ? 'visible' : 'hidden'}
				custom={1}
			>
				{name}
			</motion.h2>

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

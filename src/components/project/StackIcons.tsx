import { Icon } from '@iconify-icon/react'
import { motion } from 'framer-motion'
import { stagger } from './project-variants'

export default function StackIcons({
	stack,
	animationTriggered,
}: {
	stack: string[]
	animationTriggered: boolean
}): React.ReactNode {
	return (
		<motion.div
			className="flex flex-row items-center gap-2 text-neutral-400"
			variants={stagger}
			initial="hidden"
			animate={animationTriggered ? 'visible' : 'hidden'}
			custom={3}
		>
			{stack.map((icon, index) => (
				<Icon
					key={index}
					icon={icon}
					className="p-2 border rounded-md bg-neutral-800 border-neutral-700 text-neutral-200"
					width={24}
					height={24}
				/>
			))}
		</motion.div>
	)
}

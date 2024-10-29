import { Button } from '@/components/ui'
import { motion } from 'framer-motion'
import { stagger } from './project-variants'

export default function ProjectButton({
	url,
	btnText,
	animationTriggered,
}: {
	url: string
	btnText: string
	animationTriggered: boolean
}): React.ReactNode {
	return (
		<motion.div
			variants={stagger}
			initial="hidden"
			animate={animationTriggered ? 'visible' : 'hidden'}
			custom={4}
		>
			<Button variant="outline" className="text-xl" asChild>
				<a href={url} target="_blank" rel="noopener noreferrer">
					{btnText}
				</a>
			</Button>
		</motion.div>
	)
}

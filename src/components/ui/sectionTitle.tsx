import { MotionProps, motion } from 'framer-motion'

const titleMotionProps: MotionProps = {
	initial: { opacity: 0, y: '200%' },
	whileInView: { opacity: 1, y: 0 },
	transition: { type: 'spring' },
	viewport: { once: true },
}

export default function SectionTitle({ title }: { title: string }) {
	return (
		<>
			<motion.h2 className="text-6xl text-center my-24" {...titleMotionProps}>
				{title}
			</motion.h2>
		</>
	)
}

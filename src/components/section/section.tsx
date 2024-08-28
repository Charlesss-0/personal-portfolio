import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Section: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
	const container = useRef<HTMLDivElement | null>(null)

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start'],
	})

	const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])

	return (
		<motion.div ref={container} className="z-10 w-full h-screen text-base-100" style={{ scale }}>
			{children}
		</motion.div>
	)
}

export default Section

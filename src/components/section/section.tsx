import { ParticlesBackground } from '../particles-background'
import React from 'react'
import { motion } from 'framer-motion'

const Section: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className }) => {
	return (
		<motion.div className={`sticky top-0 flex h-screen text-base-100 ${className}`}>
			<ParticlesBackground />
			{children}
		</motion.div>
	)
}

export default Section

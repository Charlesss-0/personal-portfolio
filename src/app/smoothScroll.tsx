'use client'

import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ReactLenis
			root
			options={{
				smoothWheel: false,
				lerp: 0.1,
				duration: 0.3,
				easing: x => 1 - Math.pow(1 - x, 3),
			}}
		>
			{children}
		</ReactLenis>
	)
}

export default SmoothScroll

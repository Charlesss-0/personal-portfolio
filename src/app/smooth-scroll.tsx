'use client'

import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }): React.ReactNode {
	return (
		<ReactLenis
			root
			options={{
				smoothWheel: true,
				lerp: 0.05,
				duration: 0.3,
				easing: (x: number): number => {
					return -(Math.cos(Math.PI * x) - 1) / 2
				},
			}}
		>
			{children}
		</ReactLenis>
	)
}

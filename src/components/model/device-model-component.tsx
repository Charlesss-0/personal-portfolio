import { Suspense, useEffect, useRef } from 'react'
import { useReducedMotion, useSpring } from 'framer-motion'

import { LoaderAnimation } from '../animations'
import ModelObject from './model-object'
import { throttle } from '@/utils'
import { useInViewport } from '@/hooks'

interface DeviceModelProps {
	modelPath: string
	modelTexture: string
}

const rotationSpringConfig = {
	stiffness: 40,
	damping: 20,
	mass: 1.4,
	restSpeed: 0.001,
}

export default function DeviceModel({
	modelPath,
	modelTexture,
}: DeviceModelProps): React.ReactNode {
	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const rotationX = useSpring(0, rotationSpringConfig)
	const rotationY = useSpring(0, rotationSpringConfig)
	const positionY = useSpring(0, { stiffness: 100, damping: 20 })
	const opacity = useSpring(0, { stiffness: 60, damping: 15 })
	const laptopLidAngle = useSpring(Math.PI / 2, { stiffness: 60, damping: 20 })
	const reduceMotion = useReducedMotion()
	const isInViewport = useInViewport(containerRef, false, { threshold: 0.7 })

	useEffect(() => {
		if (!canvasRef.current) return

		const model = new ModelObject(
			canvasRef.current,
			modelPath,
			modelTexture,
			rotationX,
			rotationY,
			positionY,
			opacity,
			laptopLidAngle
		)

		return (): void => model.dispose()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rotationX, rotationY, positionY, opacity])

	useEffect(() => {
		if (isInViewport && !reduceMotion) {
			if (modelPath.includes('iphone')) {
				positionY.set(0.8)
				opacity.set(1)
			} else if (modelPath.includes('macbook')) {
				laptopLidAngle.set(0)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInViewport, laptopLidAngle, positionY, opacity, reduceMotion])

	useEffect(() => {
		const onMouseMove = throttle((event: MouseEvent) => {
			const { innerWidth, innerHeight } = window
			const position = {
				x: (event.clientX - innerWidth / 2) / innerWidth,
				y: (event.clientY - innerHeight / 2) / innerHeight,
			}

			rotationX.set(position.y / 2)
			rotationY.set(position.x / 2)
		}, 100)

		if (isInViewport && !reduceMotion) {
			window.addEventListener('mousemove', onMouseMove)
		}

		return (): void => window.removeEventListener('mousemove', onMouseMove)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInViewport, reduceMotion, rotationX, rotationY])

	return (
		<div ref={containerRef} className="w-full h-full">
			<Suspense fallback={<LoaderAnimation />}>
				<canvas ref={canvasRef} className="w-full h-full border-light-blue" />
			</Suspense>
		</div>
	)
}

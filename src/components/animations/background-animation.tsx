import * as THREE from 'three'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { type MotionValue, useScroll } from 'framer-motion'

function Particles(): React.ReactNode {
	const particlesRef = useRef<THREE.Points>(null)

	const particleColors = useMemo(
		() => [
			new THREE.Color(0xf4f6ff),
			new THREE.Color(0xf4f6ff),
			new THREE.Color(0xfef9f2),
			new THREE.Color(0xe4e0e1),
			new THREE.Color(0x77cdff),
			new THREE.Color(0xf3c623),
		],
		[]
	)

	const texture = useMemo(() => new THREE.TextureLoader().load('/images/circle.png'), [])

	const particleGeometry = useMemo(() => {
		const count = 2500
		const positions = new Float32Array(count * 3)
		const colors = new Float32Array(count * 3)

		for (let i = 0; i < count; i++) {
			const x = (Math.random() - 0.5) * 10 // x position
			const y = (Math.random() - 0.5) * 10 // y position
			const z = (Math.random() - 0.5) * 10 // z position

			positions.set([x, y, z], i * 3)

			const color = particleColors[Math.floor(Math.random() * particleColors.length)]
			colors.set([color.r, color.g, color.b], i * 3)
		}

		const geometry = new THREE.BufferGeometry()
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

		return geometry
	}, [particleColors])

	useFrame(() => {
		const positions = particlesRef.current?.geometry.attributes.position.array as Float32Array
		for (let i = 0; i < positions.length; i += 3) {
			positions[i + 1] -= 0.01 // Move particles down

			if (positions[i + 1] < -5) {
				// Reset position if out of screen
				positions[i + 1] = 5
			}
		}

		particlesRef.current!.geometry.attributes.position.needsUpdate = true
	})

	return (
		<points ref={particlesRef} geometry={particleGeometry} renderOrder={0} position={[0, 0, -2]}>
			<pointsMaterial
				size={0.02}
				sizeAttenuation={true}
				vertexColors={true}
				transparent={false}
				depthTest={true}
				depthWrite={false}
				map={texture}
			/>
		</points>
	)
}

function Sphere({ scrollY }: { scrollY: MotionValue<number> }): React.ReactNode {
	const sphereRef = useRef<THREE.Mesh>(null)
	const texture = useMemo(() => new THREE.TextureLoader().load('/images/moon-texture.jpg'), [])

	useFrame(() => {
		const scrollAmount = scrollY.get()
		const positionLimit = Math.max(0, Math.min(((scrollAmount * 0.02) / 2) * 0.1, 1.5))

		if (sphereRef.current) {
			sphereRef.current.position.set(
				0.3 - positionLimit,
				0.1 - positionLimit,
				sphereRef.current.position.z
			)
			sphereRef.current.rotation.x += 0.005
		}
	})

	return (
		<mesh ref={sphereRef} position={[0, 0, 3.3]} renderOrder={1}>
			<sphereGeometry args={[1, 64, 32, 3]} />
			<meshStandardMaterial map={texture} transparent={false} depthTest={true} depthWrite={true} />
		</mesh>
	)
}

function Scene(): React.ReactNode {
	const { scrollY } = useScroll()

	return (
		<scene>
			<ambientLight intensity={0.3} />
			<directionalLight position={[-3, -5, -5]} intensity={1.5} />
			<Particles />
			<Sphere scrollY={scrollY} />
		</scene>
	)
}

export default function BackgroundAnimation(): React.ReactNode {
	return (
		<Canvas
			style={{
				position: 'fixed',
				width: '100%',
				height: '100%',
				zIndex: -1,
			}}
			gl={{
				alpha: true,
				antialias: true,
				powerPreference: 'high-performance',
				failIfMajorPerformanceCaveat: true,
			}}
			camera={{ position: [-1, -0.5, 5], fov: 40 }}
		>
			<Suspense fallback={null}>
				<Scene />
			</Suspense>
		</Canvas>
	)
}

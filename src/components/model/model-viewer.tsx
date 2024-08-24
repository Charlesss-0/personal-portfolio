import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'

import { Canvas } from '@react-three/fiber'
import { Model } from './model'
import { Suspense } from 'react'

export default function ModelViewer() {
	return (
		<Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ height: '100vh', width: '100%' }}>
			<pointLight position={[10, 10, 10]} intensity={1.5} />

			<ambientLight intensity={1} />

			<directionalLight position={[-10, 10, 5]} intensity={1} color="#efefef" />

			<Suspense fallback={null}>
				<Model />

				<Environment preset="city" />
			</Suspense>

			<ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />

			<OrbitControls
				enablePan={false}
				enableZoom={false}
				enableRotate={false}
				minPolarAngle={Math.PI / 2.2}
				maxPolarAngle={Math.PI / 2.2}
			/>
		</Canvas>
	)
}

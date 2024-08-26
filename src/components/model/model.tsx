import * as THREE from 'three'

import React, { useEffect, useRef, useState } from 'react'

import { GLTF } from 'three-stdlib'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/three'

type GLTFAction = THREE.AnimationClip

interface GLTFResult extends GLTF {
	nodes: {
		Keyboard: THREE.Mesh
		Body: THREE.Mesh
		Touchbar: THREE.Mesh
		Frame: THREE.Mesh
		Logo: THREE.Mesh
		Screen: THREE.Mesh
	}
	materials: {
		Frame: THREE.MeshStandardMaterial
		Logo: THREE.MeshStandardMaterial
		Screen: THREE.MeshStandardMaterial
	}
	animations: GLTFAction[]
}

const readify = '/images/readify.webp'

const Model: React.FC<JSX.IntrinsicElements['group']> = props => {
	const { nodes, materials } = useGLTF('/models/macbook-pro.glb') as GLTFResult
	const meshRef = useRef<THREE.Mesh | null>(null)
	const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

	useEffect(() => {
		const screenTexture = new THREE.TextureLoader().load(readify)
		screenTexture.colorSpace = THREE.SRGBColorSpace
		screenTexture.flipY = false
		screenTexture.generateMipmaps = true

		if (materials.Screen) materials.Screen.map = screenTexture
		if (materials.Frame) materials.Frame.color.set('#2f2f2f')
	}, [materials])

	const handleMouseMove = (event: MouseEvent) => {
		const { clientX: x, clientY: y } = event
		setMouse({ x, y })
	}

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	const { rotation } = useSpring({
		rotation: [
			(mouse.y / window.innerHeight / 2) * Math.PI * 0.2,
			(mouse.x / window.innerWidth / 2) * Math.PI * 0.2,
			0,
		],
		config: { mass: 1, tension: 120, friction: 50 },
	})

	return (
		<group {...props} dispose={null}>
			<mesh
				ref={meshRef}
				geometry={nodes.Frame.geometry}
				material={materials.Frame}
				position={[0, -0.62, 0.047]}
			>
				<mesh
					geometry={nodes.Logo.geometry}
					material={materials.Logo}
					position={[0, 1.2, -0.106]}
				/>
				<mesh
					geometry={nodes.Screen.geometry}
					material={materials.Screen}
					position={[0, 1.2, -0.106]}
				/>
			</mesh>

			<mesh geometry={nodes.Keyboard.geometry} material={materials.Frame}>
				<mesh geometry={nodes.Body.geometry} material={materials.Frame} />
				<mesh geometry={nodes.Touchbar.geometry} material={materials.Frame} />
			</mesh>
		</group>
	)
}

useGLTF.preload('/models/macbook-pro.glb')

export default Model

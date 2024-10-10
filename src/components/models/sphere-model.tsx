import * as THREE from 'three'

import React, { useEffect, useRef } from 'react'

import { useScroll } from 'framer-motion'

export default function Sphere(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { scrollY } = useScroll()

	useEffect(() => {
		if (!containerRef.current) return (): null => null

		const container = containerRef.current
		const { clientWidth, clientHeight } = container

		// scene
		const scene = new THREE.Scene()
		scene.background = null

		// camera
		const camera = new THREE.PerspectiveCamera(10, clientWidth / clientHeight, 0.1, 1000)
		camera.position.set(-1, -0.5, 5)

		// renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			powerPreference: 'high-performance',
			alpha: true,
		})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(clientWidth, clientHeight)
		container.appendChild(renderer.domElement)

		// lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
		directionalLight.position.set(-5, -5, -5)
		scene.add(ambientLight, directionalLight)

		// probe
		const lightProbe = new THREE.LightProbe()
		scene.add(lightProbe)

		// texture loader
		const textureLoader = new THREE.TextureLoader()
		const texture = textureLoader.load('/images/moon-texture.jpg', texture => {
			texture.wrapS = THREE.RepeatWrapping
			texture.wrapT = THREE.RepeatWrapping
			texture.minFilter = THREE.LinearFilter
			texture.magFilter = THREE.LinearFilter
		})

		// geometry, materials, and mesh set up
		const sphereGeometry = new THREE.SphereGeometry(1, 64, 32, 3)
		const sphereMaterial = new THREE.MeshStandardMaterial({
			map: texture,
			color: 0xefefef,
		})
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
		scene.add(sphere)

		// window resize
		const handleWindowResize = (): void => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleWindowResize)

		// request animation loop
		const renderScene = (): void => {
			requestAnimationFrame(renderScene)

			const scrollAmount = scrollY.get()

			// position boundaries
			const positionLimit = Math.max(0, Math.min(((scrollAmount * 0.02) / 2) * 0.1, 1.4))
			sphere.position.set(-positionLimit, -positionLimit, 0)

			sphere.rotation.x += 0.01

			renderer.render(scene, camera)
		}
		renderScene()

		return (): void => {
			window.removeEventListener('resize', handleWindowResize)
			container.removeChild(renderer.domElement)
		}
	}, [scrollY])

	return (
		<div
			ref={containerRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			}}
		/>
	)
}

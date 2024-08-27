import * as THREE from 'three'

import React, { useEffect, useRef } from 'react'

const Sphere: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const container = containerRef.current!
		const { clientWidth, clientHeight } = container

		// scene
		const scene = new THREE.Scene()
		scene.background = null

		// camera
		const camera = new THREE.PerspectiveCamera(10, clientWidth / clientHeight, 0.1, 1000)
		camera.position.y = -0.5
		camera.position.x = -1
		camera.position.z = 5

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
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(-5, -5, -5)
		scene.add(ambientLight, directionalLight)

		// probe
		const lightProbe = new THREE.LightProbe()
		scene.add(lightProbe)

		// texture loader
		const textureLoader = new THREE.TextureLoader()
		const texture = textureLoader.load('/images/asteroid.jpg', texture => {
			texture.wrapS = THREE.RepeatWrapping
			texture.wrapT = THREE.RepeatWrapping
			texture.minFilter = THREE.LinearFilter
			texture.magFilter = THREE.LinearFilter
		})

		// geometry, materials, and mesh set up
		const sphereGeometry = new THREE.SphereGeometry(1, 64, 64, 3)
		const sphereMaterial = new THREE.MeshStandardMaterial({
			map: texture,
			color: 0xefefef,
		})
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
		scene.add(sphere)

		// window resize
		const handleWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleWindowResize)

		// request animation loop
		const renderScene = () => {
			requestAnimationFrame(renderScene)

			sphere.rotation.x += 0.01

			renderer.render(scene, camera)
		}
		renderScene()

		return () => {
			window.removeEventListener('resize', handleWindowResize)
			container.removeChild(renderer.domElement)
		}
	}, [])

	return (
		<div
			ref={containerRef}
			style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%' }}
		></div>
	)
}

export default Sphere

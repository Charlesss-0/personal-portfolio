import * as THREE from 'three'

import React, { useEffect, useRef } from 'react'

const ParticlesBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current!

		let { clientWidth, clientHeight } = container

		// scene
		const scene = new THREE.Scene()
		scene.background = null

		// camera
		const camera = new THREE.PerspectiveCamera(40, clientWidth / clientHeight, 0.1, 1000)
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

		// particles set up
		const generateParticles = () => {
			const bufferGeometry = new THREE.BufferGeometry()
			const counts = 3000
			const positions = new Float32Array(counts * 3)

			for (let i = 0; i < counts * 3; i++) {
				positions[i] = (Math.random() - 0.5) * 10 // x position
				positions[i + 1] = (Math.random() - 0.5) * 10 // y position
				positions[i + 2] = (Math.random() - 0.5) * 10 // z position
			}

			bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

			const textureLoader = new THREE.TextureLoader()
			const particlesMaterial = new THREE.PointsMaterial({
				size: 0.02,
				sizeAttenuation: true,
				color: new THREE.Color('#ffffff'),
				transparent: true,
			})

			// Rounded shape using built-in `circle` texture
			particlesMaterial.map = textureLoader.load(
				'https://threejs.org/examples/textures/sprites/circle.png'
			)
			particlesMaterial.map.minFilter = THREE.LinearFilter
			particlesMaterial.map.magFilter = THREE.LinearFilter
			particlesMaterial.depthWrite = false

			const particles = new THREE.Points(bufferGeometry, particlesMaterial)
			return { particles }
		}
		const { particles } = generateParticles()
		scene.add(particles)

		// window resize
		const handleWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleWindowResize)

		// request animation
		const renderScene = () => {
			requestAnimationFrame(renderScene)

			const positions = particles.geometry.attributes.position.array

			for (let i = 0; i < positions.length; i += 3) {
				positions[i + 1] -= 0.01 // Move particles down

				if (positions[i + 1] < -5) {
					// Reset position if out of screen
					positions[i + 1] = 5
				}
			}

			particles.geometry.attributes.position.needsUpdate = true

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
			style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
		/>
	)
}

export default ParticlesBackground

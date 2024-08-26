import * as THREE from 'three'

import React, { useEffect, useRef } from 'react'

const ParticlesBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current!

		let { clientWidth, clientHeight } = container

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(65, clientWidth / clientHeight, 0.1, 1000)
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			powerPreference: 'high-performance',
		})

		// renderer set up
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(clientWidth, clientHeight)
		container.appendChild(renderer.domElement)

		// renderer tone mapping
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 1.0

		// lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 1)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
		directionalLight.position.set(4, 8, 5)
		scene.add(ambientLight, directionalLight)

		// particles set up
		const generateParticles = () => {
			const particlesGeometry = new THREE.BufferGeometry()
			const counts = 3000
			const positions = new Float32Array(counts * 3)

			for (let i = 0; i < counts * 3; i++) {
				positions[i] = (Math.random() - 0.5) * 10 // x position
				positions[i + 1] = (Math.random() - 0.5) * 10 // y position
				positions[i + 2] = (Math.random() - 0.5) * 10 // z position
			}

			particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

			const particlesMaterial = new THREE.PointsMaterial({
				size: 0.01,
				sizeAttenuation: true,
				color: new THREE.Color('#ffffff'),
				transparent: true,
				opacity: 0.7,
			})

			// Rounded shape using built-in `circle` texture
			particlesMaterial.map = new THREE.TextureLoader().load(
				'https://threejs.org/examples/textures/sprites/circle.png'
			)
			particlesMaterial.map.minFilter = THREE.LinearFilter
			particlesMaterial.map.magFilter = THREE.LinearFilter
			particlesMaterial.depthWrite = false // Prevent depth issues

			const particles = new THREE.Points(particlesGeometry, particlesMaterial)
			return { particles }
		}
		const { particles } = generateParticles()
		scene.add(particles)

		const color = new THREE.Color('#011825')
		scene.background = color

		camera.position.z = 5

		// window resize
		const handleWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleWindowResize)

		const clock = new THREE.Clock()

		// request animation
		const renderScene = () => {
			const positions = particles.geometry.attributes.position.array

			for (let i = 0; i < positions.length; i += 3) {
				positions[i + 1] -= 0.02 // Move particles down

				if (positions[i + 1] < -5) {
					// Reset position if out of screen
					positions[i + 1] = 5
				}
			}

			particles.geometry.attributes.position.needsUpdate = true

			requestAnimationFrame(renderScene)
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

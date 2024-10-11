import * as THREE from 'three'

import { useEffect, useRef } from 'react'

import { useScroll } from 'framer-motion'

export default function ParticlesAnimation(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const { scrollY } = useScroll()

	useEffect(() => {
		if (!containerRef.current) return (): null => null

		const container = containerRef.current
		const { clientWidth, clientHeight } = container

		// scene
		const scene = new THREE.Scene()

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

		// lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
		directionalLight.position.set(-5, -5, -4)
		scene.add(ambientLight, directionalLight)

		// particles set up
		const generateParticles = (): {
			particles: THREE.Points<
				THREE.BufferGeometry<THREE.NormalBufferAttributes>,
				THREE.PointsMaterial,
				THREE.Object3DEventMap
			>
		} => {
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
				transparent: false,
				depthTest: true,
				depthWrite: false,
			})

			// Rounded shape using built-in `circle` texture
			particlesMaterial.map = textureLoader.load(
				'https://threejs.org/examples/textures/sprites/circle.png'
			)
			particlesMaterial.map.minFilter = THREE.LinearFilter
			particlesMaterial.map.magFilter = THREE.LinearFilter

			const particles = new THREE.Points(bufferGeometry, particlesMaterial)
			particles.position.z = -1
			particles.renderOrder = 0 // render particles before sphere

			return { particles }
		}
		const { particles } = generateParticles()
		scene.add(particles)

		// texture loader
		const textureLoader = new THREE.TextureLoader()
		const texture = textureLoader.load('/images/moon-texture.jpg', texture => {
			texture.wrapS = THREE.RepeatWrapping
			texture.wrapT = THREE.RepeatWrapping
			texture.minFilter = THREE.LinearFilter
			texture.magFilter = THREE.LinearFilter
		})

		const sphereGeometry = new THREE.SphereGeometry(1, 64, 32, 3)
		const sphereMaterial = new THREE.MeshStandardMaterial({
			map: texture,
			color: 0xefefef,
			transparent: false,
			depthTest: true,
			depthWrite: true,
		})
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
		sphere.renderOrder = 1 // render sphere after particles
		sphere.position.z = 3
		scene.add(sphere)

		// window resize
		const handleWindowResize = (): void => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleWindowResize)

		// request animation
		const renderScene = (): void => {
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

			const scrollAmount = scrollY.get()

			// position boundaries
			const positionLimit = Math.max(0, Math.min(((scrollAmount * 0.02) / 2) * 0.1, 1.4))
			sphere.position.set(-positionLimit, -positionLimit, sphere.position.z)

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
			style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
		/>
	)
}

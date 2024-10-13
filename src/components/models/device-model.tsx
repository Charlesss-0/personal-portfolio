import * as THREE from 'three'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion, useSpring } from 'framer-motion'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { throttle } from '@/utils'
import { useInViewport } from '@/hooks'

interface ModelProps {
	modelPath: string
	modelTexture: string
}

const rotationSpringConfig = {
	stiffness: 40,
	damping: 20,
	mass: 1.4,
	restSpeed: 0.001,
}

export default function Model({ modelPath, modelTexture }: ModelProps): React.ReactNode {
	const containerRef = useRef<HTMLDivElement>(null)
	const rotationY = useSpring(0, rotationSpringConfig)
	const rotationX = useSpring(0, rotationSpringConfig)
	const reduceMotion = useReducedMotion()
	const isInViewport = useInViewport(containerRef, false, { threshold: 0.2 })

	useEffect(() => {
		if (!containerRef.current) return (): null => null

		const container = containerRef.current!
		const { clientWidth, clientHeight } = container

		let model: THREE.Object3D<THREE.Object3DEventMap>
		let lights = []

		// scene set up
		const scene = new THREE.Scene()
		scene.background = null
		scene.fog = new THREE.Fog(0xffffff, 15, 15)

		// camera set up
		const camera = new THREE.PerspectiveCamera(40, clientWidth / clientHeight, 0.1, 1000)
		camera.position.set(0, 1, 8)

		// renderer set up
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance',
			failIfMajorPerformanceCaveat: true,
		})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(clientWidth, clientHeight)
		container.appendChild(renderer.domElement)

		// renderer tone mapping
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 1.0

		// lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 1)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 4)
		const pointLight = new THREE.PointLight(0xffffff, 10, 50)

		directionalLight.position.set(5, 5, 5)
		pointLight.position.set(5, 8, 5)
		lights = [ambientLight, directionalLight, pointLight]
		lights.forEach(light => scene.add(light))

		// loader set up
		const loader = new GLTFLoader()
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('/draco/')
		loader.setDRACOLoader(dracoLoader)

		// model loader
		loader.load(
			modelPath,
			gltf => {
				model = gltf.scene
				model.position.set(0, 0.8, 0)

				const texture = new THREE.TextureLoader().load(modelTexture)
				texture.colorSpace = THREE.SRGBColorSpace
				texture.flipY = false
				texture.wrapS = THREE.RepeatWrapping
				texture.wrapT = THREE.RepeatWrapping
				texture.anisotropy = 16
				texture.minFilter = THREE.LinearMipMapLinearFilter
				texture.magFilter = THREE.LinearFilter

				renderer.initTexture(texture)

				model.traverse(child => {
					if (child instanceof THREE.Mesh) {
						if (child.name.toLocaleLowerCase().includes('screen')) {
							child.material.map = texture
						}
						if (child.name.toLocaleLowerCase().includes('frame')) {
							child.material.color.set('#1f1f1f')
						}
					}
				})

				scene.add(model)
			},
			undefined,
			error => {
				// eslint-disable-next-line no-console
				console.error('Error loading model:', error)
			}
		)

		// window resize
		const handleWindowResize = (): void => {
			renderer.setSize(clientWidth, clientHeight)
			camera.aspect = clientWidth / clientHeight
			camera.updateProjectionMatrix()
		}
		window.addEventListener('resize', handleWindowResize)

		// request animation
		const renderScene = (): void => {
			requestAnimationFrame(renderScene)

			if (model) {
				model.rotation.x = rotationX.get()
				model.rotation.y = rotationY.get()
			}

			renderer.render(scene, camera)
		}
		renderScene()

		// cleanup
		return (): void => {
			container.removeChild(renderer.domElement)
		}
	}, [modelPath, modelTexture, rotationX, rotationY])

	useEffect(() => {
		const onMouseMove = throttle((event: MouseEvent) => {
			const { innerWidth, innerHeight } = window

			const position = {
				x: (event.clientX - innerWidth / 2) / innerWidth,
				y: (event.clientY - innerHeight / 2) / innerHeight,
			}

			rotationY.set(position.x / 2)
			rotationX.set(position.y / 2)
		}, 100)

		if (isInViewport && !reduceMotion) {
			window.addEventListener('mousemove', onMouseMove)
		}

		return (): void => {
			window.removeEventListener('mousemove', onMouseMove)
		}
	}, [isInViewport, reduceMotion, rotationX, rotationY])

	return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
}

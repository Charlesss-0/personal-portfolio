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
	const positionY = useSpring(0, { stiffness: 100, damping: 20 })
	const opacity = useSpring(0, { stiffness: 60, damping: 15 })
	const laptopLidAngle = useSpring(Math.PI / 2, { stiffness: 60, damping: 20 })
	const reduceMotion = useReducedMotion()
	const isInViewport = useInViewport(containerRef, false, { threshold: 0.7 })

	const textureLoader = new THREE.TextureLoader()

	const initScene = (
		container: HTMLDivElement,
		renderer: THREE.WebGLRenderer,
		camera: THREE.PerspectiveCamera,
		scene: THREE.Scene
	): void => {
		const { clientWidth, clientHeight } = container
		camera.aspect = clientWidth / clientHeight
		camera.updateProjectionMatrix()
		renderer.setSize(clientWidth, clientHeight)
		renderer.setPixelRatio(window.devicePixelRatio)

		container.appendChild(renderer.domElement)

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
		const keyLight = new THREE.DirectionalLight(0xffffff, 1.3)
		const fillLight = new THREE.DirectionalLight(0xffffff, 0.9)
		keyLight.position.set(0.5, 0, 0.866)
		fillLight.position.set(-6, 2, 2)
		scene.add(ambientLight, keyLight, fillLight)
	}

	useEffect(() => {
		if (!containerRef.current) return

		const container = containerRef.current!
		const { clientWidth, clientHeight } = container

		// scene and camera setup
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(40, clientWidth / clientHeight, 0.1, 1000)
		camera.position.set(0, 1, 8)

		// renderer setup
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		})
		initScene(container, renderer, camera, scene)

		// draco and GLTF loader setup
		const loader = new GLTFLoader()
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('/draco/')
		loader.setDRACOLoader(dracoLoader)

		let model: THREE.Object3D<THREE.Object3DEventMap>

		// model loader
		loader.load(
			modelPath,
			async gltf => {
				model = gltf.scene
				model.position.set(0, 0.8, 0)

				const texture = await textureLoader.loadAsync(modelTexture)
				texture.flipY = false
				texture.generateMipmaps = true
				texture.colorSpace = THREE.SRGBColorSpace
				texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

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

		// request animation
		const renderScene = (): void => {
			if (model) {
				model.rotation.x = rotationX.get()
				model.rotation.y = rotationY.get()

				if (modelPath.includes('iphone')) {
					model.position.y = positionY.get()
					model.traverse(child => {
						if (child instanceof THREE.Mesh) {
							child.material.opacity = opacity.get()
							child.material.transparent = true
						}
					})
				} else if (modelPath.includes('macbook')) {
					model.traverse(child => {
						if (child.name.toLocaleLowerCase().includes('frame')) {
							child.rotation.x = laptopLidAngle.get()
						}
					})
				}
			}
			renderer.render(scene, camera)
			requestAnimationFrame(renderScene)
		}
		renderScene()

		// window resize
		const handleWindowResize = (): void => {
			renderer.setSize(clientWidth, clientHeight)
			camera.aspect = clientWidth / clientHeight
			camera.updateProjectionMatrix()
		}
		window.addEventListener('resize', handleWindowResize)

		// cleanup
		return (): void => {
			window.removeEventListener('resize', handleWindowResize)
			container.removeChild(renderer.domElement)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rotationX, rotationY])

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
	}, [isInViewport])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInViewport, rotationX, rotationY])

	return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
}

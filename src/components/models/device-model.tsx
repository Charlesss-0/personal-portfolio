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

	useEffect(() => {
		if (!containerRef.current) return

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
		})

		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(clientWidth, clientHeight)
		renderer.outputColorSpace = THREE.SRGBColorSpace

		container.appendChild(renderer.domElement)

		// lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
		const keyLight = new THREE.DirectionalLight(0xffffff, 1.3)
		const fillLight = new THREE.DirectionalLight(0xffffff, 0.9)

		fillLight.position.set(-6, 2, 2)
		keyLight.position.set(0.5, 0, 0.866)

		lights = [ambientLight, keyLight, fillLight]
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
				texture.flipY = false
				texture.generateMipmaps = true
				texture.colorSpace = THREE.SRGBColorSpace
				texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
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
		}
		renderScene()

		// cleanup
		return (): void => {
			container.removeChild(renderer.domElement)
		}
	}, [modelPath, modelTexture, rotationX, rotationY, positionY, opacity, laptopLidAngle])

	useEffect(() => {
		if (isInViewport && !reduceMotion) {
			if (modelPath.includes('iphone')) {
				positionY.set(0.8)
				opacity.set(1)
			} else if (modelPath.includes('macbook')) {
				laptopLidAngle.set(0)
			}
		}
	}, [isInViewport, modelPath, reduceMotion, positionY, opacity, laptopLidAngle])

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

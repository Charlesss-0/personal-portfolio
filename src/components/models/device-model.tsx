import * as THREE from 'three'

import React, { useEffect, useRef } from 'react'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface ModelProps {
	modelPath: string
	modelTexture: string
}

export default function Model({ modelPath, modelTexture }: ModelProps): React.ReactNode {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return (): null => null

		const container = containerRef.current!
		const { clientWidth, clientHeight } = container

		let model: THREE.Object3D<THREE.Object3DEventMap>
		let lights = []
		let isMouseInWindow = false
		let mouseX = 0
		let mouseY = 0

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
		const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
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

		// mouse move
		const handleMouseMove = (event: MouseEvent): void => {
			const { innerWidth, innerHeight } = window
			const { clientX, clientY } = event

			mouseX = (clientX - innerWidth / 2) / innerWidth
			mouseY = (clientY - innerHeight / 2) / innerHeight

			if (model) {
				model.rotation.y = mouseX * 0.1
				model.rotation.x = mouseY * 0.1
			}

			isMouseInWindow = true
		}
		window.addEventListener('mousemove', handleMouseMove)

		// mouse leave
		const handleMouseLeave = (): void => {
			isMouseInWindow = false
		}
		container.addEventListener('mouseleave', handleMouseLeave)

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
				const targetRotationX = isMouseInWindow ? mouseY * 0.1 : 0
				const targetRotationY = isMouseInWindow ? mouseX * 0.1 : 0

				model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, targetRotationX, 0.1)
				model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, targetRotationY, 0.1)
			}

			renderer.render(scene, camera)
		}
		renderScene()

		// cleanup
		return (): void => {
			window.removeEventListener('resize', handleWindowResize)
			window.removeEventListener('mousemove', handleMouseMove)
			container.removeEventListener('mouseleave', handleMouseLeave)
			container.removeChild(renderer.domElement)
		}
	}, [modelPath, modelTexture])

	return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
}

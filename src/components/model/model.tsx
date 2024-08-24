import * as THREE from 'three'

import { useEffect, useRef } from 'react'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function Model() {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const { clientWidth, clientHeight } = containerRef.current
		let camera, scene, renderer
		let model: THREE.Object3D<THREE.Object3DEventMap>
		let isMouseInWindow = false
		let mouseX = 0,
			mouseY = 0

		// scene set up
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x0f0f0f)
		// scene.fog = new THREE.Fog(0x5f5f5f, 10, 15)

		// grid helper
		// const grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff)
		// grid.material.opacity = 0.2
		// grid.material.depthWrite = false
		// grid.material.transparent = true
		// scene.add(grid)

		// camera set up
		camera = new THREE.PerspectiveCamera(40, clientWidth / clientHeight, 0.1, 1000)
		camera.position.set(0, 1, 8)

		// renderer set up
		renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance',
			failIfMajorPerformanceCaveat: true,
		})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(clientWidth, clientHeight)
		containerRef.current?.appendChild(renderer.domElement)

		// renderer tone mapping
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 1.0

		// lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 1)
		scene.add(ambientLight)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
		directionalLight.position.set(4, 8, 5)
		scene.add(directionalLight)

		const pointLight = new THREE.PointLight(0xffffff, 10, 50)
		pointLight.position.set(5, 5, 5)
		scene.add(pointLight)

		// loader set up
		const loader = new GLTFLoader()
		const dracoLoader = new DRACOLoader()
		dracoLoader.setDecoderPath('/draco/')
		loader.setDRACOLoader(dracoLoader)

		// model loader
		loader.load(
			'/models/macbook-pro.glb',
			gltf => {
				model = gltf.scene

				model.position.set(0, 0.8, 0)

				const texture = new THREE.TextureLoader().load('/readify.webp')
				texture.colorSpace = THREE.SRGBColorSpace
				texture.flipY = false
				texture.generateMipmaps = true

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
				console.error('Error loading model:', error)
			}
		)

		// mouse move
		const handleMouseMove = (event: MouseEvent) => {
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
		const handleMouseLeave = () => {
			isMouseInWindow = false
			console.log('Mouse left the window')
		}
		containerRef.current.addEventListener('mouseleave', handleMouseLeave)

		// window resize
		const handleWindowResize = () => {
			if (!containerRef.current) return

			const { clientWidth, clientHeight } = containerRef.current

			camera.aspect = clientWidth / clientHeight
			camera.updateProjectionMatrix()

			renderer.setSize(clientWidth, clientHeight)
		}
		window.addEventListener('resize', handleWindowResize)

		// request animation
		const renderScene = () => {
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
		return () => {
			window.removeEventListener('resize', handleWindowResize)
			window.removeEventListener('mousemove', handleMouseMove)
			containerRef.current?.removeEventListener('mouseleave', handleMouseLeave)
			containerRef.current?.removeChild(renderer.domElement)
		}
	}, [])

	return <div ref={containerRef} style={{ height: '100vh', width: '100%' }}></div>
}

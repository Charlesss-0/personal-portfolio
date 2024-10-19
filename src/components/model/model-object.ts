import { type MotionValue } from 'framer-motion'
import * as THREE from 'three'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class ModelObject {
	private canvas: HTMLCanvasElement
	private scene: THREE.Scene
	private camera: THREE.PerspectiveCamera
	private renderer: THREE.WebGLRenderer
	private modelPath: string
	private modelTexture: string
	private textureLoader: THREE.TextureLoader
	private gltfLoader: GLTFLoader
	private dracoLoader: DRACOLoader
	private model?: THREE.Object3D<THREE.Object3DEventMap>
	private rotationX: MotionValue<number>
	private rotationY: MotionValue<number>
	private positionY: MotionValue<number>
	private opacity: MotionValue<number>
	private laptopLidAngle: MotionValue<number>

	constructor(
		canvas: HTMLCanvasElement,
		modelPath: string,
		modelTexture: string,
		rotationX: MotionValue<number>,
		rotationY: MotionValue<number>,
		positionY: MotionValue<number>,
		opacity: MotionValue<number>,
		laptopLidAngle: MotionValue<number>
	) {
		this.canvas = canvas
		this.modelPath = modelPath
		this.modelTexture = modelTexture
		this.rotationX = rotationX
		this.rotationY = rotationY
		this.positionY = positionY
		this.opacity = opacity
		this.laptopLidAngle = laptopLidAngle

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(
			40,
			this.canvas.clientWidth / this.canvas.clientHeight,
			0.1,
			1000
		)
		this.camera.position.set(0, 1, 8)

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true,
		})

		this.textureLoader = new THREE.TextureLoader()
		this.gltfLoader = new GLTFLoader()
		this.dracoLoader = new DRACOLoader()

		this.dracoLoader.setDecoderPath('/draco/')
		this.gltfLoader.setDRACOLoader(this.dracoLoader)

		this.initScene()
		this.loadModel()
		this.renderScene()
		this.handleResize()

		window.addEventListener('resize', this.handleResize.bind(this))
	}

	private initScene(): void {
		this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
		const keyLight = new THREE.DirectionalLight(0xffffff, 1.3)
		const fillLight = new THREE.DirectionalLight(0xffffff, 0.9)
		keyLight.position.set(0.5, 0, 0.866)
		fillLight.position.set(-6, 2, 2)

		this.scene.add(ambientLight, keyLight, fillLight)
	}

	private loadModel(): void {
		this.gltfLoader.load(
			this.modelPath,
			async gltf => {
				this.model = gltf.scene
				this.model.position.set(0, 0.8, 0)

				const texture = await this.textureLoader.loadAsync(this.modelTexture)
				texture.flipY = false
				texture.generateMipmaps = true
				texture.colorSpace = THREE.SRGBColorSpace
				texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy()

				this.model.traverse(child => {
					if (child instanceof THREE.Mesh) {
						if (child.name.toLocaleLowerCase().includes('screen')) {
							child.material.map = texture
						}

						if (child.name.toLocaleLowerCase().includes('frame')) {
							child.material.color.set('#1f1f1f')
						}
					}
				})

				this.scene.add(this.model)
			},
			undefined,
			error => {
				// eslint-disable-next-line no-console
				console.log('Error loading model: ', error)
			}
		)
	}

	private renderScene(): void {
		const renderLoop = (): void => {
			if (this.model) {
				this.model.rotation.x = this.rotationX.get()
				this.model.rotation.y = this.rotationY.get()

				if (this.modelPath.includes('iphone')) {
					this.model.position.y = this.positionY.get()
					this.model.traverse(child => {
						if (child instanceof THREE.Mesh) {
							child.material.opacity = this.opacity.get()
							child.material.transparent = true
						}
					})
				} else if (this.modelPath.includes('macbook')) {
					this.model.traverse(child => {
						if (child.name.toLocaleLowerCase().includes('frame')) {
							child.rotation.x = this.laptopLidAngle.get()
						}
					})
				}
			}

			this.renderer.render(this.scene, this.camera)
			requestAnimationFrame(renderLoop)
		}

		renderLoop()
	}

	private handleResize(): void {
		this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
		this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight
		this.camera.updateProjectionMatrix()
	}

	public dispose(): void {
		window.removeEventListener('resize', this.handleResize.bind(this))
		this.renderer.dispose()
	}
}

import { type ISourceOptions } from '@tsparticles/engine'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useMemo, useState } from 'react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticlesCanvas() {
	const [init, setInit] = useState<boolean>(false)

	useEffect(() => {
		initParticlesEngine(async engine => {
			await loadSlim(engine)
		}).then(() => {
			setInit(true)
		})
	}, [])

	const options: ISourceOptions = useMemo(
		() => ({
			autoPlay: true,
			background: {
				color: {
					value: '#ffffff',
				},
			},
			backgroundMask: {
				composite: 'destination-out',
				cover: {
					color: {
						value: {
							r: 0,
							g: 0,
							b: 0,
						},
					},
					opacity: 1,
				},
				enable: true,
			},
			clear: true,
			fullScreen: {
				enable: false,
				zIndex: 0,
			},
			detectRetina: true,
			fpsLimit: 120,
			interactivity: {
				detectsOn: 'window',
				events: {
					onClick: {
						enable: true,
						mode: 'push',
					},
					onHover: {
						enable: true,
						mode: 'grab',
					},
				},
				modes: {
					connect: {
						distance: 80,
						links: {
							opacity: 0.5,
						},
						radius: 80,
					},
					grab: {
						distance: 300,
						links: {
							blink: false,
							consent: false,
							opacity: 1,
						},
					},
					push: {
						default: true,
						quantity: 4,
					},
					remove: {
						quantity: 5,
					},
					slow: {
						factor: 3,
						radius: 200,
					},
				},
			},
			particles: {
				color: {
					value: '#ffffff',
				},
				move: {
					decay: 0,
					direction: 'none',
					drift: 0,
					enable: true,
					speed: 4,
				},
				number: {
					density: {
						enable: true,
						width: 1920,
						height: 1080,
					},
					value: 150,
				},
				shape: {
					close: true,
					fill: true,
					type: 'circle',
				},
				size: {
					value: {
						min: 1,
						max: 1,
					},
					animation: {
						count: 0,
						enable: false,
						speed: 5,
						decay: 0,
						delay: 0,
						sync: false,
						mode: 'auto',
						startValue: 'random',
						destroy: 'none',
					},
				},
				life: {
					count: 0,
					delay: {
						random: {
							enable: false,
							minimumValue: 0,
						},
						value: 0,
						sync: false,
					},
					duration: {
						random: {
							enable: false,
							minimumValue: 0.0001,
						},
						value: 0,
						sync: false,
					},
				},
				rotate: {
					direction: 'clockwise',
					path: false,
					random: false,
				},
				links: {
					color: {
						value: 'random',
					},
					consent: false,
					distance: 200,
					enable: true,
					frequency: 1,
					opacity: 0.4,
					width: 1,
				},
			},
			pauseOnBlur: true,
			pauseOnOutsideViewport: true,
			zLayers: 100,
		}),
		[]
	)

	if (init) {
		return (
			<div className="h-screen">
				<Particles id="tsparticles" options={options} className="h-full" />
			</div>
		)
	}

	return <></>
}

'use client'

import { Contact, Hero, ProjectSummary } from '@/components/layout'
import { useEffect, useState } from 'react'

import { LoaderAnimation } from '@/components/animations'
import dynamic from 'next/dynamic'
import { projects } from '@/data/projects-data'

const Particles = dynamic(() => import('@/components/animations/particles-animation'), {
	ssr: true,
	loading: () => (
		<div className="flex items-center justify-center w-full h-screen">
			<LoaderAnimation />
		</div>
	),
})

export default function Home(): React.ReactNode {
	const [isParticlesLoaded, setIsParticlesLoaded] = useState<boolean>(false)

	useEffect(() => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => setIsParticlesLoaded(true))
		} else {
			const timeout = setTimeout(() => {
				setIsParticlesLoaded(true)
			}, 1000)

			return (): void => clearTimeout(timeout)
		}
	}, [])

	return (
		<>
			<Particles />
			{isParticlesLoaded && (
				<>
					<Hero />
					{projects.map((project, index) => (
						<ProjectSummary
							key={index}
							index={index + 1}
							{...project}
							className={index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
						/>
					))}
					<Contact />
				</>
			)}
		</>
	)
}

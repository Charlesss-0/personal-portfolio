'use client'

import { Contact, Hero, ProjectSummary } from '@/components/layout'
import { useEffect, useState } from 'react'

import { LoaderAnimation } from '@/components/animations'
import dynamic from 'next/dynamic'
import { projects } from '@/data/projects-data'

const Background = dynamic(() => import('@/components/animations/background-animation'), {
	ssr: true,
	loading: () => (
		<div className="flex items-center justify-center w-full h-screen">
			<LoaderAnimation />
		</div>
	),
})

export default function Home(): React.ReactNode {
	const [isBackgroundLoaded, setIsBackgroundLoaded] = useState<boolean>(false)
	const [isHeroRendered, setIsHeroRendered] = useState<boolean>(false)

	useEffect(() => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => setIsBackgroundLoaded(true))
		} else {
			const timeout = setTimeout(() => {
				setIsBackgroundLoaded(true)
			}, 1000)

			return (): void => clearTimeout(timeout)
		}
	}, [])

	useEffect(() => {
		if (isBackgroundLoaded) {
			const timeout = setTimeout(() => {
				setIsHeroRendered(true)
			}, 1000)

			return (): void => clearTimeout(timeout)
		}
	}, [isBackgroundLoaded])

	return (
		<>
			<Background />
			{isBackgroundLoaded && <Hero />}

			{isHeroRendered && isBackgroundLoaded && (
				<>
					<div className="projects">
						{projects.map((project, index) => (
							<ProjectSummary
								key={index}
								index={index + 1}
								{...project}
								className={index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
							/>
						))}
					</div>
					<Contact />
				</>
			)}
		</>
	)
}

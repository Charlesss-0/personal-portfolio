'use client'

import { useEffect, useState } from 'react'

import Contact from '@/components/contact/Contact'
import Hero from '@/components/hero/Hero'
import { Loader } from '@/components/ui'
import Project from '@/components/project/Project'
import dynamic from 'next/dynamic'
import { projects } from '@/data/projects-data'

const Background = dynamic(() => import('@/components/layout/Background'), {
	ssr: true,
	loading: () => (
		<div className="z-10 flex items-center justify-center w-full h-screen">
			<Loader />
		</div>
	),
})

export default function Home(): React.ReactNode {
	const [isBackgroundLoaded, setIsBackgroundLoaded] = useState<boolean>(false)
	const [isHeroRendered, setIsHeroRendered] = useState<boolean>(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsBackgroundLoaded(true)
		}, 1000)

		return (): void => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (isBackgroundLoaded) {
			const timeout = setTimeout(() => {
				setIsHeroRendered(true)
			}, 1500)

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
							<Project
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

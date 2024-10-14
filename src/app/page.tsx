'use client'

import { Contact, Hero, ProjectSummary } from '@/components/layout'

import { ParticlesAnimation } from '@/components/animations'
import { projects } from '@/data/projects-data'

export default function Home(): React.ReactNode {
	return (
		<div>
			<ParticlesAnimation />
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
		</div>
	)
}

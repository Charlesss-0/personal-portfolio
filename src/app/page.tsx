'use client'

import { Contact, Hero, ProjectSummary, Section } from '@/components/layout'

import { ParticlesAnimation } from '@/components/animations'
import { projects } from '@/data/projects-data'

export default function Home(): React.ReactNode {
	return (
		<div>
			<ParticlesAnimation />

			<Hero />

			{projects.map((project, index) => (
				<Section key={index}>
					<ProjectSummary
						{...project}
						className={index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
					/>
				</Section>
			))}

			<Section>
				<Contact />
			</Section>
		</div>
	)
}

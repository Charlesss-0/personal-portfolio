'use client'

import { Contact, Hero, ProjectSummary, Section } from '@/components/layout'

import { ParticlesBackground } from '@/components/animations'
import { SphereModel } from '@/components/models'
import { projects } from '@/data/projects-data'

export default function Home(): React.ReactNode {
	return (
		<div>
			<ParticlesBackground />
			<SphereModel />

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

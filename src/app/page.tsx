'use client'

import { ParticlesBackground, Sphere } from '@/components/threejs'

import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { ProjectSummary } from '@/components/project-summary'
import { Section } from '@/components/section'
import { portfolio } from '@/data/portfolio-data'

export default function Home() {
	return (
		<div>
			<ParticlesBackground />
			<Sphere />

			<Hero />

			{portfolio.map((project, index) => (
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

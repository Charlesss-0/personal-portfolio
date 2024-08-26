'use client'

import { Section } from '@/components/section'
import { portfolio } from '@/data/portfolio-data'

export default function Home() {
	return (
		<>
			{portfolio.map((project, index) => (
				<Section
					key={index}
					{...project}
					className={index % 2 === 0 ? 'flex' : 'flex-row-reverse'}
				/>
			))}
		</>
	)
}

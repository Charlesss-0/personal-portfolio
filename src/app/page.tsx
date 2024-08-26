'use client'

import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Portfolio } from '@/components/portfolio'
import { Section } from '@/components/section'
import { portfolio } from '@/components/portfolio/portfolio-data'

export default function Home() {
	return (
		<>
			{/* <Navbar />
			<Hero />
			<Portfolio />
			<Contact />
			<Footer /> */}
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

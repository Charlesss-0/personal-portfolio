import { Suspense, lazy } from 'react'

import { Chakra_Petch } from 'next/font/google'
import { LinkToProjectsBtn } from './portfolio.styles'
import { SectionTitle } from '../sectionTitle'
import { devices } from '@/constants'
import { motion } from 'framer-motion'
import { portfolio } from './portfolio-data'

const chakraPetch = Chakra_Petch({
	weight: '600',
	subsets: ['latin'],
})

const motionProps = (index: number, offsetOne: string, offsetTwo: string) => ({
	initial: { opacity: 0, x: `${index % 2 === 0 ? offsetOne : offsetTwo}` },
	whileInView: { opacity: 1, x: 0 },
	transition: { type: 'tween' },
	viewport: { once: true, margin: '0px 0px -200px 0px' },
})

const Model = lazy(() => import('@/components/model').then(module => ({ default: module.Model })))

export default function Portfolio() {
	return (
		<section id="portfolio" className={`text-base-100 xl:mt-16 ${chakraPetch.className}`}>
			<SectionTitle title="Portfolio" />

			<ul className="flex flex-col p-10 px-16 overflow-hidden gap-60 md:px-2 xl:gap-24">
				{portfolio.map((project, index) => (
					<li
						key={index}
						className={`flex p-4 xl:flex-col xl:gap-10 h-screen ${
							index % 2 === 0 ? 'flex' : 'flex-row-reverse'
						}`}
					>
						<motion.div className="w-full" {...motionProps(index, '-100%', '100%')}>
							<Suspense fallback={null}>
								<Model
									modelPath="/models/macbook-pro.glb"
									modelTexture={project.img}
									scale={devices.md ? 1 : 1}
								/>
							</Suspense>
						</motion.div>

						<motion.div
							className="flex flex-col items-center w-full text-center justify-evenly xl:gap-5"
							{...motionProps(index, '100%', '-100%')}
						>
							<h1 className="text-4xl md:text-2xl">{project.name}</h1>

							<p className="w-[50%] text-md text-neutral-content md:w-full md:text-sm">
								{project.description}
							</p>

							<a href={project.url} target="_blank">
								<LinkToProjectsBtn>
									<span>View Project</span>
								</LinkToProjectsBtn>
							</a>
						</motion.div>
					</li>
				))}
			</ul>
		</section>
	)
}

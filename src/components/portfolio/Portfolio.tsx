import { Suspense, lazy } from 'react'

import { Button } from '../button'
import { SectionTitle } from '../sectionTitle'
import { motion } from 'framer-motion'
import { portfolio } from './portfolio-data'

const motionProps = (index: number, offsetOne: string, offsetTwo: string) => ({
	initial: { opacity: 0, x: `${index % 2 === 0 ? offsetOne : offsetTwo}` },
	whileInView: { opacity: 1, x: 0 },
	transition: { type: 'spring' },
	viewport: { once: true, margin: '0px 0px -200px 0px' },
})

// const Model = lazy(() => import('@/components/model').then(module => ({ default: module.Model })))

export default function Portfolio() {
	return (
		<section id="portfolio" className={`text-base-100 xl:mt-16`}>
			<SectionTitle title="Portfolio" />

			<ul className="flex flex-col p-10 px-16 overflow-hidden md:px-2 xl:gap-24">
				{portfolio.map((project, index) => (
					<li
						key={index}
						className={`flex p-4 xl:flex-col xl:gap-10 h-[90vh] ${
							index % 2 === 0 ? 'flex' : 'flex-row-reverse'
						}`}
					>
						<motion.div className="w-full" {...motionProps(index, '-100%', '100%')}>
							{/* <Suspense fallback={null}>
								<Model modelPath="/models/macbook-pro.glb" modelTexture={project.img} />
							</Suspense> */}
						</motion.div>

						<motion.div
							className="flex flex-col items-center justify-center gap-10 text-center xl:gap-5"
							{...motionProps(index, '100%', '-100%')}
						>
							<h1 className="text-4xl md:text-2xl">{project.name}</h1>

							<p className="w-[50%] text-md text-neutral-content md:w-full md:text-sm">
								{project.description}
							</p>

							<a href={project.url} target="_blank">
								<Button>View Project</Button>
							</a>
						</motion.div>
					</li>
				))}
			</ul>
		</section>
	)
}

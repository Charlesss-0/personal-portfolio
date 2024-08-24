import { Chakra_Petch } from 'next/font/google'
import { LinkToProjectsBtn } from './portfolio.styles'
import { ProjectCard } from '../projectCard'
import { SectionTitle } from '../sectionTitle'
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

export default function Portfolio() {
	return (
		<section id="portfolio" className={`text-base-100 xl:mt-16 ${chakraPetch.className}`}>
			<SectionTitle title="Portfolio" />

			<ul className="flex flex-col gap-60 p-10 px-16 overflow-hidden md:px-2 xl:gap-24">
				{portfolio.map((project, index) => (
					<li
						key={index}
						className={`flex p-4 xl:flex-col xl:gap-10 ${
							index % 2 === 0 ? 'flex' : 'flex-row-reverse'
						}`}
					>
						<motion.div className="w-full" {...motionProps(index, '-100%', '100%')}>
							<ProjectCard img={project.img} alt={project.name} />
						</motion.div>

						<motion.div
							className="w-full text-center flex flex-col justify-evenly items-center xl:gap-5"
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

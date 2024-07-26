import { ProjectCard, SectionTitle } from './ui'

import { Chakra_Petch } from 'next/font/google'
import { motion } from 'framer-motion'
import { portfolio } from '@/src/data'
import styled from 'styled-components'

const chakraPetch = Chakra_Petch({
	weight: '600',
	subsets: ['latin'],
})

const LinkToProjectsBtn = styled.button`
	font-size: 1.5rem;
	padding: 0.5rem 4rem;
	transition: all 0.2s ease-in;
	position: relative;
	z-index: 1;
	overflow: hidden;
	outline: 1px solid #fff;

	&:hover {
		color: black;
		outline: none;
	}

	&:after {
		content: '';
		background: #fff;
		position: absolute;
		z-index: -1;
		left: -20%;
		right: -20%;
		top: 0;
		bottom: 0;
		transform: skewX(-45deg) scale(0, 1);
		transition: all 0.5s;
	}

	&:hover:after {
		transform: skewX(-45deg) scale(0.75, 1);
	}

	&:active {
		transform: scale(0.95);
	}
`

const motionProps = (index: number, offsetOne: string, offsetTwo: string) => ({
	initial: { opacity: 0, x: `${index % 2 === 0 ? offsetOne : offsetTwo}` },
	whileInView: { opacity: 1, x: 0 },
	transition: { type: 'tween' },
	viewport: { once: true, margin: '0px 0px -200px 0px' },
})

export default function Portfolio() {
	return (
		<section id="portfolio" className={`text-base-100 ${chakraPetch.className}`}>
			<SectionTitle title="Portfolio" />

			<ul className="flex flex-col gap-80 p-10 px-16 overflow-hidden">
				{portfolio.map((project, index) => (
					<li key={index} className={`flex p-4 ${index % 2 === 0 ? 'flex' : 'flex-row-reverse'}`}>
						<motion.div className="w-full" {...motionProps(index, '-100%', '100%')}>
							<ProjectCard img={project.img} alt={project.name} />
						</motion.div>

						<motion.div
							className="w-full text-center flex flex-col justify-around items-center"
							{...motionProps(index, '100%', '-100%')}
						>
							<h1 className="text-6xl">{project.name}</h1>

							<p className="w-[50%] text-xl text-neutral-content">{project.description}</p>

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

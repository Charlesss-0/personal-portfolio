import Card from './ui/3dCard'
import { Chakra_Petch } from 'next/font/google'
import React from 'react'
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

export default function Portfolio() {
	return (
		<section id="portfolio" className={`text-base-100 py-20 ${chakraPetch.className}`}>
			<h1 className="text-6xl text-center mb-16">Portfolio</h1>

			<ul className="flex flex-col gap-80 p-10 px-16">
				{portfolio.map((project, index) => (
					<li key={index} className={`flex p-4 ${index % 2 === 0 ? 'flex' : 'flex-row-reverse'}`}>
						<div className="w-full">
							<Card img={project.img} alt={project.name} />
						</div>

						<div className="w-full text-center flex flex-col justify-around items-center">
							<h1 className="text-6xl">{project.name}</h1>

							<p className="w-[50%] text-xl text-neutral-content">{project.description}</p>

							<a href={project.url} target="_blank">
								<LinkToProjectsBtn>
									<span>View Project</span>
								</LinkToProjectsBtn>
							</a>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}

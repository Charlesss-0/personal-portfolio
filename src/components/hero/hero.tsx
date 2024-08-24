import { Chakra_Petch, Montserrat } from 'next/font/google'

import ParticlesCanvas from '../particles/particles'
import Typewriter from '../typewriter/typewriter'
import config from '@/data/config.json'

const montserrat = Montserrat({
	weight: '600',
	subsets: ['latin'],
})

const chakraPetch = Chakra_Petch({
	weight: '600',
	subsets: ['latin'],
})

export default function Hero() {
	return (
		<section id="hero" className="h-screen text-base-100 select-none">
			<ParticlesCanvas />

			<div className="absolute bottom-32 md:bottom-16 left-0 px-5">
				<h1 className={`text-9xl text-neutral lg:text-6xl ${chakraPetch.className}`}>
					Carlos
					<br />
					Aragon
				</h1>
			</div>

			<div className="absolute bottom-0 right-0 w-full px-5 flex start">
				<Typewriter
					text={config.role}
					className={`text-5xl text-right font-semibold md:text-xl ${montserrat.className}`}
				/>
			</div>
		</section>
	)
}

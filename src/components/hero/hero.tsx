import { Chakra_Petch, Montserrat } from 'next/font/google'

import { FaGithub } from 'react-icons/fa6'
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

const Hero = () => {
	return (
		<>
			<div className="relative flex flex-col justify-end w-full h-screen select-none text-base-100">
				<div className="left-0 px-5">
					<h1 className={`text-9xl text-neutral lg:text-6xl ${chakraPetch.className}`}>
						Carlos
						<br />
						Aragon
					</h1>
				</div>

				<div className="flex w-full px-5 start">
					<Typewriter
						text={config.role}
						className={`text-5xl text-right font-semibold md:text-xl ${montserrat.className}`}
					/>
				</div>

				<a
					href={config.github}
					target="_blank"
					className="absolute p-2 transition-all duration-300 rounded-full cursor-pointer bottom-10 right-10 hover:bg-neutral"
				>
					<FaGithub className="text-4xl" />
				</a>
			</div>
		</>
	)
}

export default Hero

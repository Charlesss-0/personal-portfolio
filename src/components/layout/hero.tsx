import { FaGithub } from 'react-icons/fa6'
import { Typewriter } from '@/components/animations'
import config from '@/data/config.json'

export default function Hero(): React.ReactNode {
	return (
		<>
			<div className="relative flex flex-col justify-end w-full h-screen select-none text-base-100">
				<div className="left-0 px-5">
					<h1 className="font-semibold text-gray-600 text-9xl text-neutral lg:text-6xl font-telegraf-regular">
						Carlos
						<br />
						Aragon
					</h1>
				</div>

				<div className="flex w-full px-5 start">
					<Typewriter
						text={config.role}
						className="text-5xl font-semibold text-right text-gray-200 md:text-xl font-telegraf-regular"
					/>
				</div>

				<a
					href={config.github}
					rel="noreferrer"
					target="_blank"
					className="absolute p-2 transition-all duration-300 rounded-full cursor-pointer bottom-10 right-10 hover:bg-neutral"
				>
					<FaGithub className="text-4xl fill-gray-50" />
				</a>
			</div>
		</>
	)
}

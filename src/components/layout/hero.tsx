import { Button } from '../ui'
import { Icon } from '@iconify/react'
import { Typewriter } from '@/components/animations'
import config from '@/data/config.json'

export default function Hero(): React.ReactNode {
	return (
		<>
			<div className="relative flex flex-col justify-end w-full h-screen select-none text-base-100">
				<div className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
					<div className="px-5">
						<h1 className="text-5xl text-neutral-200 text-neutral lg:text-6xl">Carlos Aragon</h1>
					</div>

					<div className="flex px-5">
						<Typewriter
							text={config.role}
							className="font-semibold text-8xl text-neutral-500 md:text-xl"
						/>
					</div>
				</div>

				<Button
					variant="ghost"
					className="absolute rounded-full cursor-pointer bottom-10 left-10 hover:bg-transparent"
					size="icon"
					asChild
				>
					<a href={config.github} rel="noreferrer" target="_blank">
						<Icon
							icon="codicon:github"
							className="text-5xl transition-all duration-300 ease-in-out text-neutral-200 hover:text-neutral-400"
						/>
					</a>
				</Button>
			</div>
		</>
	)
}

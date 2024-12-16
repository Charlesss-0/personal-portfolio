'use client'

import Hero from '@/components/hero/Hero'
import Image from 'next/image'
import { projects } from '@/data/projects-data'

export default function Home(): React.ReactNode {
	return (
		<div className="flex flex-col gap-32">
			<Hero />

			<div className="flex h-screen overflow-x-scroll w-max snap-x snap-mandatory">
				{projects.map(({ name, img, url, btnText, id }, index) => (
					<div
						key={id}
						className="flex items-center justify-center flex-1 w-screen h-full snap-start"
					>
						<div className="flex flex-col items-center justify-center h-full">
							<Image src={img} alt={name} width={1000} height={1000} className="rounded-lg" />

							<div className="flex items-center justify-between w-full px-8 py-4 text-4xl">
								<h2>{name}</h2>

								<p className="text-neutral-400">/ 0{index + 1}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

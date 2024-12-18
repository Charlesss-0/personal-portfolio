'use client'

import { useEffect, useRef } from 'react'

import Hero from '@/components/hero/Hero'
import Image from 'next/image'
import { projects } from '@/data/projects-data'

export default function Home(): React.ReactNode {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = scrollRef.current

		if (!element) return

		const handleScroll = (event: WheelEvent): void => {
			const atStart = element.scrollLeft === 0
			const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth

			if (element.scrollWidth > element.clientWidth) {
				event.preventDefault()

				element.scrollBy({
					left: event.deltaY,
					behavior: 'smooth',
				})
			}
		}

		element.addEventListener('wheel', handleScroll, { passive: false })

		return (): void => element.removeEventListener('wheel', handleScroll)
	}, [])

	return (
		<div className="flex flex-col gap-32">
			<Hero />

			<div
				ref={scrollRef}
				className="flex w-full h-screen overflow-x-scroll snap-x snap-mandatory no-scrollbar"
			>
				<div className="flex w-max">
					{projects.map(({ name, img, url, btnText, id }, index) => (
						<div
							key={id}
							className="flex items-center justify-center flex-none w-full h-full snap-start"
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
		</div>
	)
}

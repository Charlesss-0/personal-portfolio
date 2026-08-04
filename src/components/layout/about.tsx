import Image from "next/image";

export default function About(): React.ReactNode {
	return (
		<div className="w-full max-w-6xl px-6 mx-auto my-12 md:mt-24 md:mb-36">
			<h2 className="mb-12 font-serif text-2xl font-medium md:text-4xl">
				About me
			</h2>

			<div className="flex items-center justify-between gap-8 md:gap-16">
				<p className="font-mono text-sm md:text-xl text-secondary">
					I'm Carlos Aragon, a web developer who enjoys building modern,
					performant web applications with Next.js, React, TypeScript, and
					Tailwind CSS. I also specialize in conversion tracking, making it
					easier for businesses to measure what matters.
				</p>

				<div className="w-32 h-32 overflow-hidden border-2 rounded-full select-none border-secondary shrink-0">
					<Image
						src="/images/profile/profile-picture.jpeg"
						alt="Carlos Aragon"
						width={100}
						height={100}
						draggable={false}
						className="object-cover w-full h-full"
					/>
				</div>
			</div>
		</div>
	);
}

/** biome-ignore-all lint/suspicious/noArrayIndexKey: static-syntax, items never reorder */

export default function Marquee(): React.ReactNode {
	return (
		<div className="py-2 overflow-hidden md:py-6 md:border-y-4 border-y-3 bg-primary text-primary-content border-base-300">
			<div className="flex gap-16 font-serif text-2xl marquee-track whitespace-nowrap md:text-5xl">
				{Array.from({ length: 10 }).map((_, i) => (
					<div key={i} className="flex gap-16 shrink-0">
						{[
							"Next.js",
							"React",
							"TypeScript",
							"Tailwind CSS",
							"PostgreSQL",
							"Docker",
							"Framer Motion",
						].map((tech) => (
							<span key={tech} className="flex items-center gap-16">
								<span>{tech}</span>
								<span className="text-accent">✦</span>
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

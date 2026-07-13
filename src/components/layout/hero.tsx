export default function Hero(): React.ReactNode {
	return (
		<div className="flex justify-center p-4 lg:py-34">
			<div className="max-w-6xl space-y-16">
				<h1 className="font-serif lg:text-[9.5rem] tracking-tight leading-[0.92]">
					Interfaces that <em className="text-accent">feel</em> <br /> as good
					as they <br />{" "}
					<span className="underline underline-offset-8 decoration-accent decoration-[6px]">
						perform
					</span>
					.
				</h1>

				<p className="font-mono text-xl text-secondary">
					I'm Carlos Aragon, a web developer from Nicaragua who loves building
					products with{" "}
					<span className="text-primary">Next.js, React, Typescript,</span> and{" "}
					<span className="text-primary">Tailwind CSS</span>.
				</p>
			</div>
		</div>
	);
}

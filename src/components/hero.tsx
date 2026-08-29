export default function Hero(): React.ReactNode {
	return (
		<div className="flex justify-center p-4 py-12 lg:py-34">
			<h1 className="font-serif md:text-[9.5rem] text-[5rem] tracking-tight leading-[0.92]">
				Interfaces that <em className="text-accent">feel</em> <br /> as good as
				they <br />{" "}
				<span className="underline underline-offset-8 decoration-accent decoration-[6px]">
					perform
				</span>
				.
			</h1>
		</div>
	);
}

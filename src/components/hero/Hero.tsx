export default function Hero(): React.ReactNode {
	return (
		<>
			<div className="flex flex-col justify-center w-full h-screen select-none">
				<div className="w-full">
					<h1 className="self-start mb-6 text-5xl tracking-tight text-neutral-400">
						Carlos Aragon
					</h1>

					<div className="relative -bottom-40 flex flex-col text-[20rem] tracking-tight">
						<span className="absolute bottom-0 left-0 flex items-center bg-gradient-to-b from-neutral-200 from-20% to-light-blue/60 bg-clip-text text-transparent leading-none -mb-24">
							Web
						</span>

						<span className="absolute top-0 left-0 flex items-center bg-gradient-to-b from-neutral-200 from-20% to-light-blue/60 bg-clip-text text-transparent leading-none">
							Developer
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default function Projects(): React.ReactNode {
	return (
		<div className="flex justify-center">
			<div className="max-w-6xl space-y-16 lg:py-24">
				<h2 className="font-serif font-medium md:text-6xl">Recent projects.</h2>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
					<div className="border w-6xl card border-secondary-content">
						<div className="card-body">
							<div className="relative w-full">
								<span className="absolute font-mono badge top-2 left-2 text-[10px]">
									2026
								</span>
								<img
									src="https://picsum.photos/id/10/16/9"
									alt="Project 1"
									className="w-full"
								/>
							</div>

							<div className="p-6 space-y-4">
								<h3 className="text-4xl tracking-tight card-title">
									Weather App
								</h3>

								<p className="text-secondary">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								</p>

								<div className="flex items-center">
									<span className="badge badge-outline text-[10px] font-mono font-medium">
										Next.JS
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

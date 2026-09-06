import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import TechIcon from "@/components/tech-icon";
import { getProjectBySlug } from "@/utils/projects";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<React.ReactNode> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return notFound();

	return (
		<div className="space-y-12">
			<div className="w-full max-w-6xl px-6 py-8 mx-auto space-y-12">
				<div className="flex items-center justify-between pb-4 border-b border-base-300">
					<Link href="/" className="text-lg btn btn-ghost md:text-xl">
						<GoArrowLeft className="mr-4 size-6 md:size-7" />
						Go back
					</Link>

					<h1 className="font-serif text-3xl md:text-5xl">{project.name}</h1>
				</div>

				<Image
					src={project.img}
					alt={project.name}
					width={1920}
					height={1080}
					className="object-cover w-full border rounded-lg aspect-video border-secondary-content md:rounded-xl"
					loading="eager"
				/>

				<p className="text-md text-secondary md:text-xl">
					{project.description}
				</p>
			</div>

			<div className="w-full bg-base-200 border-y border-base-300">
				<div className="flex flex-col items-center justify-between w-full max-w-6xl px-6 pt-12 pb-8 mx-auto md:flex-row md:py-0">
					<h2 className="mb-10 font-serif text-4xl md:mb-0">Approach</h2>

					<div className="w-full max-w-4xl pr-8">
						{project.approach.map((step, index) => (
							<div key={step.step}>
								<div className="flex items-start justify-start gap-4 px-4 py-8">
									<div className="font-mono text-xs text-accent">
										{step.step}
									</div>

									<div className="text-md">{step.text}</div>
								</div>

								{index !== project.approach.length - 1 && (
									<div className="w-full h-px bg-base-300" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="py-4 overflow-hidden md:py-8 border-y border-base-300">
				<div className="flex gap-14 md:gap-16 marquee-track whitespace-nowrap">
					{Array.from({ length: 10 }).map((_, i) => (
						<div key={i} className="flex gap-14 md:gap-16">
							{project.stack.map((stack) => (
								<div key={stack} className="flex items-center gap-14 md:gap-16">
									<span key={stack} className="flex items-center gap-4">
										<TechIcon name={stack} className="size-6 md:size-10" />

										<span className="text-xl md:text-3xl">
											{stack.split("-").join(" ")}
										</span>
									</span>

									<span className="text-3xl text-accent md:text-4xl">✦</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end w-full max-w-6xl px-6 mx-auto mt-10 mb-20">
				<Link
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-soft btn-sm md:btn-md"
				>
					View on GitHub
					<GoArrowRight size={16} className="ml-2" />
				</Link>
			</div>
		</div>
	);
}

import Image from "next/image";
import TechIcon from "@/components/ui/tech-icon";
import type { projects } from "@/data/projects-data";
import twMerge from "@/utils/tw-merge";

type ProjectCardProps = {
	project: (typeof projects)[number];
	index: number;
};

export default function ProjectCard({
	project,
	index,
}: ProjectCardProps): React.ReactNode {
	return (
		<div
			className={twMerge(
				"border w-full card border-secondary-content md:col-span-1",
				index === 0 && "md:col-span-2",
			)}
		>
			<div className="card-body">
				<div className="relative w-full">
					<Image
						src={project.img}
						alt={project.name}
						width={400}
						height={400}
						className="object-cover w-full h-64"
					/>
				</div>

				<div className="p-6 space-y-4">
					<h3 className="text-4xl tracking-tight card-title">{project.name}</h3>

					<p className="text-sm text-secondary md:text-md">
						{project.description}
					</p>

					<div className="flex items-center gap-2">
						{project.stack.map((stack) => (
							<span
								key={stack}
								className="badge badge-outline text-[10px] font-mono font-medium"
							>
								<TechIcon name={stack} size={16} />
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

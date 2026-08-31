import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";
import TechIcon from "@/components/tech-icon";
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
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.push(`/project/${project.id}`)}
			className={twMerge(
				"border w-full card border-secondary-content md:col-span-1 hover:border-accent transition-all duration-200 ease-in-out cursor-pointer group",
				index === 0 && "md:col-span-2",
			)}
		>
			<div className="card-body gap-0">
				<div className="relative w-full">
					<Image
						src={project.img}
						alt={project.name}
						width={400}
						height={400}
						className="object-cover w-full h-64"
					/>

					<div className="absolute bottom-4 right-4 bg-base-100 p-2 rounded-full group-hover:bg-accent transition-all duration-200 ease-in-out border border-base-300">
						<GoArrowUpRight
							size={24}
							className="text-base-content group-hover:text-base-100 transition-all duration-200 ease-in-out"
						/>
					</div>
				</div>

				<div className="p-6 space-y-4 border-t border-secondary-content">
					<h3 className="text-4xl transition-all duration-200 ease-in-out card-title group-hover:text-accent">
						{project.name}
					</h3>

					<p className="text-sm text-secondary md:text-md text-start">
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
		</button>
	);
}

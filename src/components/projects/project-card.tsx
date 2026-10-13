"use client";

import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import type { Project } from "@/lib/project";
import twMerge from "@/lib/tw-merge";

export default function ProjectCard({
	project,
	index,
}: {
	project: Project;
	index: number;
}): React.ReactNode {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className={twMerge(
				"border w-full card border-secondary-content md:col-span-1 hover:border-accent transition-all duration-200 ease-in-out cursor-pointer group",
				(index === 0 || index === 1) && "md:col-span-2",
			)}
		>
			<div className="gap-0 card-body">
				<div className="relative w-full">
					{project.img && (
						<Image
							src={project.img}
							alt={project.imgAlt}
							width={1920}
							height={1080}
							draggable={false}
							className="object-cover w-full h-64"
							loading="lazy"
						/>
					)}

					<div className="absolute p-2 transition-all duration-200 ease-in-out border rounded-full bottom-4 right-4 bg-base-100 group-hover:bg-accent border-base-300">
						<GoArrowUpRight
							size={24}
							className="transition-all duration-200 ease-in-out text-base-content group-hover:text-base-100"
						/>
					</div>
				</div>

				<div className="p-6 space-y-4 border-t border-secondary-content">
					<h3 className="text-4xl transition-all duration-200 ease-in-out card-title group-hover:text-accent">
						{project.name}
					</h3>

					<p className="text-sm text-secondary md:text-md text-start">
						{project.overview}
					</p>
				</div>
			</div>
		</Link>
	);
}

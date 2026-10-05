"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";
import type { Project } from "@/lib/projects";
import twMerge from "@/lib/tw-merge";

export default function ProjectCard({
	project,
	index,
}: {
	project: Project;
	index: number;
}): React.ReactNode {
	const router = useRouter();
	const image = project.featuredImage?.node;
	const details = project.projectDetails;

	return (
		<button
			type="button"
			onClick={() => router.push(`/projects/${project.slug}`)}
			className={twMerge(
				"border w-full card border-secondary-content md:col-span-1 hover:border-accent transition-all duration-200 ease-in-out cursor-pointer group",
				(index === 0 || index === 1) && "md:col-span-2",
			)}
		>
			<div className="gap-0 card-body">
				<div className="relative w-full">
					{image?.sourceUrl && (
						<Image
							src={image?.sourceUrl ?? ""}
							alt={image?.altText ?? ""}
							fill
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
						{project.title}
					</h3>

					<p className="text-sm text-secondary md:text-md text-start">
						{details?.summary}
					</p>
				</div>
			</div>
		</button>
	);
}

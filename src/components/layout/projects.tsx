"use client";

import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/data/projects-data";

export default function Projects(): React.ReactNode {
	return (
		<div id="projects" className="flex justify-center">
			<div className="max-w-6xl space-y-16 lg:py-24">
				<h2 className="font-serif font-medium md:text-6xl">Recent projects.</h2>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{projects.map((project, index) => (
						<ProjectCard key={project.id} project={project} index={index} />
					))}
				</div>
			</div>
		</div>
	);
}

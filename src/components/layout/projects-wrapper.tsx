"use client";

import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/data/projects-data";

export default function ProjectsWrapper(): React.ReactNode {
	return (
		<div id="projects" className="flex justify-center mb-12 md:mb-0">
			<div className="w-full max-w-6xl px-4 md:space-y-16 md:py-24">
				<h2 className="mt-8 mb-12 font-serif text-3xl font-medium md:text-6xl md:p-0 md:mt-6">
					Recent projects.
				</h2>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{projects.map((project, index) => (
						<ProjectCard key={project.id} project={project} index={index} />
					))}
				</div>
			</div>
		</div>
	);
}

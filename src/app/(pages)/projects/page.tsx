import ProjectCard from "@/components/projects/project-card";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<section className="w-full max-w-6xl px-4 py-16 mx-auto">
			<h1 className="text-2xl font-semibold md:text-4xl">Projects</h1>

			{projects.length === 0 ? (
				<p className="mt-10 text-neutral-500">
					No projects published yet. Add one in WordPress under Projects.
				</p>
			) : (
				<ul className="grid gap-10 mt-10 md:grid-cols-2">
					{projects.map((project, index) => (
						<li key={project.slug}>
							<ProjectCard key={index} project={project} index={index} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

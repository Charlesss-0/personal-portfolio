import { projects } from "@/data/projects-data";

export function getProjectBySlug(
	id: string,
): (typeof projects)[number] | undefined {
	return projects.find((project) => project.id === id);
}

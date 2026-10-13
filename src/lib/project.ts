import type { ProjectsQuery as ProjectsResult } from "@/gql/graphql";
import graphqlFetch from "@/lib/graphql-fetch";
import {
	ProjectBySlugQuery,
	ProjectSlugsQuery,
	ProjectsQuery,
} from "@/queries/project.query";

type RawProject = NonNullable<
	NonNullable<ProjectsResult["projects"]>["nodes"][number]
>;

function parseApproach(value?: string | null) {
	return (value ?? "")
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean)
		.map((text, index) => ({
			step: String(index + 1).padStart(2, "0"),
			text,
		}));
}

function toProject(raw: RawProject) {
	if (!raw.slug || !raw.title) return null;

	const details = raw.projectDetails;
	const image = raw.featuredImage?.node;

	return {
		id: raw.slug,
		name: raw.title,
		slug: raw.slug,
		tagline: details?.tagline ?? "",
		overview: details?.overview ?? "",
		approach: parseApproach(details?.approach),
		description: details?.description ?? "",
		img: image?.sourceUrl ?? "",
		imgAlt: image?.altText || raw.title,
		stack: (raw.technologies?.nodes ?? []).flatMap((tech) =>
			tech.slug ? [tech.slug] : [],
		),
		githubUrl: details?.githubUrl ?? "",
		url: details?.url || undefined,
		btnText: details?.btnText || "View Project",
		featured: details?.featured ?? false,
	};
}

export type Project = NonNullable<ReturnType<typeof toProject>>;

function featuredFirst(projects: Project[]) {
	return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getProjects(): Promise<Project[]> {
	const data = await graphqlFetch(ProjectsQuery);
	const projects = (data.projects?.nodes ?? [])
		.map((node) => toProject(node))
		.filter((project): project is Project => project !== null);

	return featuredFirst(projects);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
	const projects = await getProjects();

	return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectSlugs(): Promise<string[]> {
	const data = await graphqlFetch(ProjectSlugsQuery);
	return (data.projects?.nodes ?? []).flatMap((node) =>
		node.slug ? [node.slug] : [],
	);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
	const data = await graphqlFetch(ProjectBySlugQuery, { slug });
	return data.project ? toProject(data.project) : null;
}

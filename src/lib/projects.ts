import type { ProjectsQuery as ProjectsResult } from "@/gql/graphql";
import graphqlFetch from "@/lib/graphql-fetch";
import {
	ProjectBySlugQuery,
	ProjectSlugsQuery,
	ProjectsQuery,
} from "@/queries/project.query";

export type RawProject = NonNullable<
	NonNullable<ProjectsResult["projects"]>["nodes"][number]
> & { content?: string | null };

const FALLBACK_WIDTH = 1600;
const FALLBACK_HEIGHT = 900;

function toProject(raw: RawProject) {
	if (!raw.slug || !raw.title) return null;

	const image = raw.featuredImage?.node;
	const details = raw.projectDetails;

	return {
		title: raw.title,
		slug: raw.slug,
		content: raw.content ?? null,
		featuredImage: image?.sourceUrl
			? {
					node: {
						sourceUrl: image.sourceUrl,
						altText: image.altText ?? "",
						mediaDetails: {
							width: image.mediaDetails?.width ?? FALLBACK_WIDTH,
							height: image.mediaDetails?.height ?? FALLBACK_HEIGHT,
						},
					},
				}
			: null,
		technologies: {
			nodes: (raw.technologies?.nodes ?? []).flatMap((tech) =>
				tech.name && tech.slug ? [{ name: tech.name, slug: tech.slug }] : [],
			),
		},
		projectDetails: details,
	};
}

export type Project = NonNullable<ReturnType<typeof toProject>>;
export type WPImage = NonNullable<Project["featuredImage"]>["node"];
export type Technology = Project["technologies"]["nodes"][number];

export async function featuredFirst(projects: Project[]) {
	return [...projects].sort(
		(a, b) =>
			Number(!!b.projectDetails?.featured) -
			Number(!!a.projectDetails?.featured),
	);
}

export async function getProjects(): Promise<Project[]> {
	const data = await graphqlFetch(ProjectsQuery);
	const projects = (data.projects?.nodes ?? [])
		.map((node) => toProject(node))
		.filter((project): project is Project => !!project);

	return featuredFirst(projects);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
	const projects = await getProjects();

	return projects.filter((p) => p.projectDetails?.featured).slice(0, limit);
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

import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/utils/projects";

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<React.ReactNode> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return notFound();

	return (
		<div>
			<h1>{project.name}</h1>
		</div>
	);
}

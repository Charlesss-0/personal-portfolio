/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: WPGraphQl */
import { notFound } from "next/navigation";
import graphqlFetch from "@/lib/graphql-fetch";
import { PostBySlugQuery } from "@/queries/posts";

export function generateStaticParams() {}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const data = await graphqlFetch(PostBySlugQuery, { slug });
	const post = data?.post;

	if (!post) notFound();

	return (
		<article className="w-full max-w-6xl px-4 py-16 mx-auto">
			<div
				className="prose md:prose-md prose-headings:font-semibold max-w-none prose-h1:text-2xl md:prose-h1:text-4xl prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed prose-h2:text-xl md:prose-h2:text-2xl prose-code:text-xs md:prose-code:text-sm"
				dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
			/>
		</article>
	);
}

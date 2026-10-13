/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: WPGraphQl */

import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import graphqlFetch from "@/lib/graphql-fetch";
import { sanitizeContent } from "@/lib/sanitize-content";
import { PostBySlugQuery } from "@/queries/post.query";
import { formatDate } from "@/utils/format-date";

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
			<header className="flex items-center justify-between mb-12 md:mb-18">
				<Link href="/blog" className="btn btn-ghost">
					<BsArrowLeft size={24} />
					Back to blog
				</Link>

				<span className="text-sm text-primary">
					{formatDate(post.date ?? "")}
					{" - "}
					{post.readingTime} min read
				</span>
			</header>

			<div
				className="prose md:prose-md prose-headings:font-semibold max-w-none prose-h1:text-2xl md:prose-h1:text-4xl prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed prose-h2:text-xl md:prose-h2:text-2xl prose-code:text-xs md:prose-code:text-sm"
				dangerouslySetInnerHTML={{
					__html: sanitizeContent(post.content ?? ""),
				}}
			/>
		</article>
	);
}

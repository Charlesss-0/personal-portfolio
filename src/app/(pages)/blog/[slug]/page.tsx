import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BsArrowLeft } from "react-icons/bs";
import WordPressContent from "@/components/wordpress-content";
import { getPostBySlug, getPostsSlugs } from "@/lib/posts";
import { formatDate } from "@/utils/format-date";
import { sanitizeContent } from "@/utils/sanitize-content";

const getPost = cache(getPostBySlug);

export async function generateStaticParams() {
	const slugs = await getPostsSlugs();

	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) return notFound();

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getPost(slug);

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

			<div className="prose md:prose-md prose-headings:font-semibold max-w-none prose-h1:text-2xl md:prose-h1:text-4xl prose-p:text-sm md:prose-p:text-base prose-p:leading-loose prose-h2:text-xl md:prose-h2:text-2xl prose-code:text-xs md:prose-code:text-sm">
				<WordPressContent html={sanitizeContent(post.content ?? "")} />
			</div>
		</article>
	);
}

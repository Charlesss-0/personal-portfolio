import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BsArrowLeft } from "react-icons/bs";
import rehypePrettyCode from "rehype-pretty-code";
import { useMDXcomponents } from "@/mdx-components";
import { getAllPosts, getPostBySlug } from "@/utils/posts";

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) return {};

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

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const MDXComponents = useMDXcomponents();
	const post = getPostBySlug(slug);
	if (!post) return notFound();

	return (
		<article className="w-full max-w-6xl px-4 py-16 mx-auto">
			<header className="flex items-center justify-between mb-12 md:mb-18">
				<Link href="/blog" className="btn btn-ghost">
					<BsArrowLeft size={24} />
					Back to blog
				</Link>

				<div>
					<time className="text-sm text-primary">{post.date}</time>

					<span className="ml-2 text-sm text-secondary">
						{post.readingTime}
					</span>
				</div>
			</header>

			<div className="prose md:prose-md prose-headings:font-semibold max-w-none">
				<MDXRemote
					source={post.content}
					components={MDXComponents}
					options={{
						mdxOptions: {
							rehypePlugins: [
								[
									rehypePrettyCode,
									{
										theme: "dracula",
										keepBackground: true,
									},
								],
							],
						},
					}}
				/>
			</div>
		</article>
	);
}

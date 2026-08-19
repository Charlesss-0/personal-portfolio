import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/utils/posts";

export const metadata: Metadata = {
	title: "Blog",
	description: "Articles about web development, React, and Next.js",
};

export default async function BlogPage(): Promise<React.ReactNode> {
	const posts = getAllPosts();

	return (
		<main className="w-full max-w-6xl px-4 py-16 mx-auto">
			<h1 className="mb-12 text-4xl font-bold">Blog</h1>

			<div>
				{posts.map((post) => (
					<article
						key={post.slug}
						className="p-4 border space-y-10 transition-colors rounded-4xl border-base-300 hover:border-accent bg-base-200"
					>
						<Link href={`/blog/${post.slug}`} className="group">
							<div>
								<time className="text-sm text-primary">{post.date}</time>

								<span className="ml-2 text-sm text-secondary">
									{post.readingTime}
								</span>

								<h2 className="mt-1 text-lg font-semibold md:text-xl transition-colors group-hover:text-accent">
									{post.title}
								</h2>

								<p className="my-2 text-sm md:text-base text-secondary">
									{post.description}
								</p>
							</div>

							<div className="flex flex-wrap py-2 gap-2">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="h-full px-4 text-xs truncate badge badge-outline text-primary"
									>
										{tag}
									</span>
								))}
							</div>
						</Link>
					</article>
				))}
			</div>
		</main>
	);
}

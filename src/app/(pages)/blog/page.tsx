import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/utils/format-date";

export default async function BlogPage(): Promise<React.ReactNode> {
	const posts = await getAllPosts();

	return (
		<main className="w-full max-w-6xl px-4 py-16 mx-auto">
			<h1 className="mb-12 text-4xl font-bold">Blog</h1>

			<div className="space-y-6">
				{posts.map((post) => (
					<article
						key={post.slug}
						className="p-4 border space-y-10 transition-colors rounded-4xl border-base-300 hover:border-accent bg-primary-content"
					>
						<Link href={`/blog/${post.slug}`} className="group">
							<div>
								<time className="text-sm text-primary">
									{formatDate(post.date)}
									{" - "}
									{post.readingTime} min read
								</time>

								<h2 className="mt-1 text-lg font-semibold transition-colors md:text-xl group-hover:text-accent">
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
										className="h-full px-4 text-xs truncate border-none badge badge-outline text-primary bg-base-200"
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

import type { AllPostsQuery as AllPostsResult } from "@/gql/graphql";
import graphqlFetch from "@/lib/graphql-fetch";
import {
	AllPostsQuery,
	PostBySlugQuery,
	PostSlugsQuery,
} from "@/lib/queries/post.query";

type RawPost = NonNullable<
	NonNullable<AllPostsResult["posts"]>["nodes"][number]
>;

function toPost(raw: RawPost) {
	if (!raw.slug || !raw.title) return null;

	const tags = raw.tags?.nodes.map((tag) => tag.slug) ?? [];
	const description = raw.description?.description ?? "";

	return {
		id: raw.id,
		title: raw.title,
		slug: raw.slug,
		excerpt: raw.excerpt ?? "",
		date: raw.date ?? "",
		modified: raw.modified ?? "",
		readingTime: raw.readingTime ?? 0,
		tags,
		description,
		featuredImage: raw.featuredImage?.node.sourceUrl ?? "",
		content: raw.content ?? "",
	};
}

export type Post = NonNullable<ReturnType<typeof toPost>>;

export async function getAllPosts(): Promise<Post[]> {
	const data = await graphqlFetch(AllPostsQuery);
	const posts = (data.posts?.nodes ?? [])
		.map((node) => toPost(node))
		.filter((post): post is Post => post !== null);

	return posts;
}

export async function getPostsSlugs(): Promise<string[]> {
	const data = await graphqlFetch(PostSlugsQuery);

	return (data.posts?.nodes ?? []).flatMap((node) =>
		node.slug ? [node.slug] : [],
	);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const data = await graphqlFetch(PostBySlugQuery, { slug });

	return data.post ? toPost(data.post) : null;
}

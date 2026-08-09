import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getLastModifiedDate } from "@/utils/get-last-modified";

const postsDirectory = path.join(process.cwd(), "./src/content/posts");

export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	published: boolean;
	readingTime: string;
	content: string;
}

export function getAllPosts(): Post[] {
	const files = fs.readdirSync(postsDirectory);

	return files
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => {
			const slug = file.replace(/\.mdx$/, "");
			const fullPath = path.join(postsDirectory, file);
			const raw = fs.readFileSync(fullPath, "utf-8");
			const { data, content } = matter(raw);

			return {
				slug,
				title: data.title,
				date: getLastModifiedDate(fullPath),
				description: data.description,
				tags: data.tags ?? [],
				published: data.published ?? false,
				readingTime: readingTime(content).text,
				content,
			};
		})
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
	return getAllPosts().find((post) => post.slug === slug);
}

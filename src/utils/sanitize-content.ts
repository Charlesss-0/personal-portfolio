import sanitizeHtml from "sanitize-html";

export function sanitizeContent(html: string) {
	return sanitizeHtml(html, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			img: ["src", "alt", "width", "height", "loading"],
		},
		allowedSchemes: ["http", "https", "data"],
	});
}

export function safeHref(url?: string | null) {
	if (!url) return null;

	try {
		const parsed = new URL(url);

		return parsed.protocol === "https:" || parsed.protocol === "http:"
			? parsed.href
			: null;
	} catch {
		return null;
	}
}

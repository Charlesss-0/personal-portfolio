import sanitizeHtml from "sanitize-html";

export function sanitizeContent(html: string) {
	return sanitizeHtml(html, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			pre: ["class", "data-language", "data-lang"],
			code: ["class", "data-language", "data-lang"],
			img: ["src", "alt", "width", "height", "loading"],
		},
		allowedSchemes: ["http", "https", "data"],
	});
}

import parse, { type Element } from "html-react-parser";
import { cache } from "react";
import { codeToHtml } from "shiki";
import CopyButton from "@/components/copy-button";

const LANGUAGE_ALIASES: Record<string, string> = {
	typescript: "tsx",
	ts: "tsx",
	javascript: "jsx",
	js: "jsx",
};

const highlightCode = cache(async (source: string, language: string) => {
	try {
		return await codeToHtml(source, {
			lang: language,
			theme: "dracula",
		});
	} catch {
		return await codeToHtml(source, {
			lang: "text",
			theme: "dracula",
		});
	}
});

function getLanguage(...classNames: Array<string | undefined>) {
	for (const className of classNames) {
		const match = className?.match(/(?:^|\s)language-([^\s]+)/i);
		if (match?.[1]) {
			const lang = match[1].toLowerCase();

			return LANGUAGE_ALIASES[lang] ?? lang;
		}
	}

	return "text";
}

function getTextContent(node: unknown): string {
	if (!node || typeof node !== "object") return "";

	if ("data" in node && typeof node.data === "string") return node.data;

	if ("children" in node && Array.isArray(node.children)) {
		return node.children.map(getTextContent).join("");
	}

	return "";
}

function cleanSource(source: string, language: string) {
	const isMarkup = ["html", "xml", "svg", "vue", "svelte", "astro"].includes(
		language,
	);
	const cleaned = isMarkup ? source : source.replace(/<\/?em>/g, "");

	return cleaned.replace(/\n$/, "");
}

function findCode(node: Element): Element | undefined {
	for (const child of node.children) {
		if (child.type !== "tag") continue;

		const el = child as Element;
		if (el.name === "code") return el;

		const nested = findCode(el);
		if (nested) return nested;
	}
}

async function CodeBlock({
	source,
	language,
}: {
	source: string;
	language: string;
}) {
	const html = await highlightCode(source, language);

	return <CopyButton text={source} html={html} />;
}

export default function WordPressContent({ html }: { html: string }) {
	return parse(html, {
		replace(node) {
			if (node.type !== "tag") return;

			const el = node as Element;
			if (el.name !== "pre") return;

			const code = findCode(el);
			if (!code) return;

			const language = getLanguage(code.attribs.class, el.attribs.class);
			const source = cleanSource(getTextContent(code), language);

			return <CodeBlock language={language} source={source} />;
		},
	});
}

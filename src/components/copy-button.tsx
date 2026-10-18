/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: WordPress managed content */
"use client";

import { useState } from "react";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";
import twMerge from "@/utils/tw-merge";

export default function CopyButton({
	text,
	html,
	className,
}: {
	text: string;
	html: string;
	className?: string;
}): React.ReactNode {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {}
	}

	return (
		<div className="relative">
			<div
				className={twMerge(
					className,
					"[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:text-sm",
				)}
				dangerouslySetInnerHTML={{ __html: html }}
			/>

			<button
				type="button"
				onClick={handleCopy}
				aria-label={copied ? "Copied!" : "Copy"}
				className="hidden absolute border-none rounded-md right-2 top-2 btn btn-ghost hover:bg-white/10 md:inline-block"
			>
				{copied ? (
					<>
						<LuClipboardCheck className="text-primary-content" />
						<span className="sr-only">Copied!</span>
					</>
				) : (
					<>
						<LuClipboard className="text-primary-content" />
						<span className="sr-only">Copy</span>
					</>
				)}
			</button>
		</div>
	);
}

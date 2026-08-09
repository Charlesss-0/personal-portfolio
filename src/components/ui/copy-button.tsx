"use client";

import { useRef, useState } from "react";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";

export default function CopyButton({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode {
	const [copied, setCopied] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);

	async function handleCopy() {
		const text = preRef.current?.textContent ?? "";

		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {}
	}

	return (
		<div className="relative">
			<pre ref={preRef} className="p-4">
				{children}
			</pre>

			<button
				type="button"
				onClick={handleCopy}
				aria-label={copied ? "Copied!" : "Copy"}
				className="absolute border-none rounded-md right-2 top-2 btn btn-ghost hover:bg-secondary"
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

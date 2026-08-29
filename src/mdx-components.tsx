import type { MDXComponents } from "mdx/types";
import CopyButton from "@/components/copy-button";

const components: MDXComponents = {
	code: (props) => <code className="mdx-inline-code" {...props} />,
	pre: (props) => <CopyButton {...props} />,
};

export function useMDXcomponents(): MDXComponents {
	return components;
}

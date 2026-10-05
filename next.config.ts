import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const wp = new URL(process.env.WORDPRESS_GRAPHQL_URL as string);

const nextConfig: NextConfig = {
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	images: {
		remotePatterns: [
			{
				protocol: wp.protocol === "https:" ? "https" : "http",
				hostname: wp.hostname,
				port: wp.port,
				pathname: "/wp-content/uploads/**",
			},
		],
	},
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

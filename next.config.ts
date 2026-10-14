import type { NextConfig } from "next";

const wp = new URL(process.env.WORDPRESS_GRAPHQL_URL as string);
const isLocalWP = ["localhost", "127.0.0.1", "::1"].includes(wp.hostname);

const nextConfig: NextConfig = {
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	images: {
		dangerouslyAllowLocalIP:
			process.env.NODE_ENV === "development" && isLocalWP,
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

export default nextConfig;

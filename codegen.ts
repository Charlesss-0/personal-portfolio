import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config: CodegenConfig = {
	schema: {
		[`${process.env.WORDPRESS_GRAPHQL_URL}`]: {
			headers: {
				"User-Agent": "Codegen",
				Authorization: `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASS}`).toString("base64")}`,
			},
		},
	},
	documents: ["src/**/*.{ts,tsx}"],
	ignoreNoDocuments: true,
	generates: {
		"src/gql/": {
			preset: "client",
			config: {
				documentMode: "string",
			},
		},
	},
};

export default config;

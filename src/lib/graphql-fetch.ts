import { GraphQLClient } from "graphql-request";
import type { TypedDocumentString } from "@/gql/graphql";

const client = new GraphQLClient(process.env.WORDPRESS_GRAPHQL_URL as string, {
	next: { revalidate: 3600, tags: ["wordpress"] },
});

function graphqlFetch<TData, TVariables>(
	query: TypedDocumentString<TData, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TData> {
	return client.request<TData>(
		query.toString(),
		variables as Record<string, unknown> | undefined,
	);
}

export default graphqlFetch;

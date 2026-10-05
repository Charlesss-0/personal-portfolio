import { GraphQLClient, type Variables } from "graphql-request";
import type { TypedDocumentString } from "@/gql/graphql";

const client = new GraphQLClient(process.env.WORDPRESS_GRAPHQL_URL as string, {
	next: { revalidate: 3600, tags: ["wordpress"] },
});

function graphqlFetch<TData>(
	query: TypedDocumentString<TData, Variables>,
	variables?: Variables,
): Promise<TData> {
	if (variables === undefined) {
		return client.request<TData>(query.toString());
	}

	return client.request<TData, Variables>(query.toString(), variables);
}

export default graphqlFetch;

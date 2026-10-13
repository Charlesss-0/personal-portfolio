import { graphql } from "@/gql";

export const PostBySlugQuery = graphql(`
    query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            slug
            title
            excerpt
            content
            date
            modified
            readingTime
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }    
`);

export const AllPostsQuery = graphql(`
    query AllPosts {
        posts {
            nodes {
                id
                title
                excerpt
                date
                slug
                modified
                featuredImage {
                    node {
                        id
                        sourceUrl
                        altText
                    }
                }
            }
        }
    }
`);

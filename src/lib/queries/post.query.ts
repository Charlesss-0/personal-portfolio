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
            description {
                description
            }
            tags {
                nodes {
                    slug
                }
            }            
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }    
`);

export const PostSlugsQuery = graphql(`
    query PostSlugs {
        posts(first: 100) {
            nodes {
                slug
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
                content
                date
                slug
                modified
                readingTime
                description {
                    description
                }
                tags {
                    nodes {
                        slug
                    }
                }
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
            }
        }
    }
`);

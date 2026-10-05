import { graphql } from "@/gql";

export const ProjectsQuery = graphql(`
	query Projects {
		projects(
			first: 100
			where: {
				orderby: [
					{ field: MENU_ORDER, order: ASC }
					{ field: DATE, order: DESC }
				]
			}
		) {
			nodes {
				title
				slug
				featuredImage {
					node {
						sourceUrl
						altText
						mediaDetails {
							width
							height
						}
					}
				}
				technologies {
					nodes {
						name
						slug
					}
				}
				projectDetails {
					summary
					role
					year
					liveUrl
					repoUrl
					featured
				}
			}
		}
	}
`);

export const ProjectSlugsQuery = graphql(`
	query ProjectSlugs {
		projects(first: 100) {
			nodes {
				slug
			}
		}
	}
`);

export const ProjectBySlugQuery = graphql(`
	query ProjectBySlug($slug: ID!) {
		project(id: $slug, idType: SLUG) {
			title
			slug
			content
			featuredImage {
				node {
					sourceUrl
					altText
					mediaDetails {
						width
						height
					}
				}
			}
			technologies {
				nodes {
					name
					slug
				}
			}
			projectDetails {
				summary
				role
				year
				liveUrl
				repoUrl
				featured
			}
		}
	}
`);

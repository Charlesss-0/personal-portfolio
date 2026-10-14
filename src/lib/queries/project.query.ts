import { graphql } from "@/gql";

export const ProjectsQuery = graphql(`
	query Projects {
		projects(
			first: 100
			where: {
				orderby: [
					{ field: MENU_ORDER, order: ASC }
					{ field: DATE, order: ASC }
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
					}
				}
				technologies {
					nodes {
						slug
					}
				}
				projectDetails {
					tagline
					overview
					description
					approach
					url
					githubUrl
					btnText
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
			featuredImage {
				node {
					sourceUrl
					altText
				}
			}
			technologies {
				nodes {
					slug
				}
			}
			projectDetails {
				tagline
				overview
				description
				approach
				url
				githubUrl
				btnText
				featured
			}
		}
	}
`);

/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: process.env.SITE_URL || "https://carlosaragondev.vercel.app",
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	transform: async (_, loc) => {
		const lastmod = new Date().toISOString();

		if (loc === "/") {
			return { loc, changefreq: "daily", priority: 1, lastmod };
		}

		if (loc === "/posts") {
			return { loc, changefreq: "daily", priority: 0.9, lastmod };
		}

		if (loc.startsWith("/posts/")) {
			return { loc, changefreq: "weekly", priority: 0.8, lastmod };
		}

		if (loc === "/projects") {
			return { loc, changefreq: "daily", priority: 0.8, lastmod };
		}

		if (loc.startsWith("/projects")) {
			return { loc, changefreq: "weekly", priority: 0.6, lastmod };
		}

		return { loc, changefreq: "weekly", priority: 0.7, lastmod };
	},
};

export default config;

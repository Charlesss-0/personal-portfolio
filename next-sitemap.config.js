const config = {
	siteUrl: 'https://carlosaragondev.vercel.app',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [{ userAgent: '*', allow: '/' }],
	},
}

module.exports = config

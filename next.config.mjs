/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
		removeConsole: process.env.NODE_ENV !== 'development',
	},
	transpilePackages: ['three'],
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							"default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com",
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'geolocation=(self), microphone=()',
					},
				],
			},
		]
	},
}

export default nextConfig

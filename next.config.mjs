/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
		removeConsole: process.env.NODE_ENV !== 'development',
	},
}

export default nextConfig

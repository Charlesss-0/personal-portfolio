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
}

export default nextConfig

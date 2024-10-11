import './globals.css'

import type { Metadata, Viewport } from 'next'
import { chakraPetch, montserrat, poppins, telegrafRegular } from './fonts'

import SmoothScroll from './smooth-scroll'
import StyledComponentsRegistry from './registry'
import config from '@/data/config.json'

export const metadata: Metadata = {
	title: config.name,
	description: 'Personal portfolio',
	generator: 'Next.js',
	manifest: '/site.webmanifest',
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
	return (
		<StyledComponentsRegistry>
			<html
				lang="en"
				className={`${poppins.variable} ${telegrafRegular.variable} ${montserrat.variable} ${chakraPetch.variable} antialiased no-scrollbar`}
			>
				<SmoothScroll>
					<body className="text-gray-50">
						<main>{children}</main>
					</body>
				</SmoothScroll>
			</html>
		</StyledComponentsRegistry>
	)
}

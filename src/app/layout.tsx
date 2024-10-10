import './globals.css'

import { chakraPetch, montserrat, poppins, telegrafRegular } from './fonts'

import type { Metadata } from 'next'
import SmoothScroll from './smoothScroll'
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

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
	return (
		<StyledComponentsRegistry>
			<html
				lang="en"
				className={`${poppins.variable} ${telegrafRegular.variable} ${montserrat.variable} ${chakraPetch.variable} antialiased no-scrollbar`}
			>
				<body className="text-gray-50">
					<SmoothScroll>
						<main>{children}</main>
					</SmoothScroll>
				</body>
			</html>
		</StyledComponentsRegistry>
	)
}

import './globals.css'

import type { Metadata, Viewport } from 'next'
import { bebasNeue, telegrafRegular } from './fonts'

import LenisScroll from './lenis-scroll'
import StyledComponentsRegistry from './registry'
import config from '@/data/config.json'

export const metadata: Metadata = {
	title: config.name,
	description: config.description,
	generator: 'Next.js',
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
				className={`${telegrafRegular.variable} ${bebasNeue.variable} antialiased no-scrollbar`}
			>
				<LenisScroll>
					<body className="text-gray-50 font-bebas-neue">
						<main>{children}</main>
					</body>
				</LenisScroll>
			</html>
		</StyledComponentsRegistry>
	)
}

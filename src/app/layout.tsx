import './globals.css'

import type { Metadata } from 'next'
import SmoothScroll from './smoothScroll'
import StyledComponentsRegistry from '@/hoc/Registry'
import config from '@/data/config.json'
import { poppins } from './fonts'

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
			<html lang="en" className="no-scrollbar">
				<body className={`${poppins.className} antialiased`}>
					<SmoothScroll>
						<main>{children}</main>
					</SmoothScroll>
				</body>
			</html>
		</StyledComponentsRegistry>
	)
}

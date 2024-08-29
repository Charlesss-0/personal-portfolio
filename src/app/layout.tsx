import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import SmoothScroll from './smoothScroll'
import StyledComponentsRegistry from '@/hoc/Registry'
import config from '@/data/config.json'

const poppins = Poppins({
	weight: '600',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: config.name,
	description: 'Personal portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<StyledComponentsRegistry>
			<html lang="en" className="no-scrollbar">
				<body className={poppins.className}>
					<SmoothScroll>
						<main>{children}</main>
					</SmoothScroll>
				</body>
			</html>
		</StyledComponentsRegistry>
	)
}

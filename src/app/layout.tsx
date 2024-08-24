import './globals.css'

import { Chakra_Petch } from 'next/font/google'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/hoc/Registry'
import config from '@/data/config.json'

const chakraPetch = Chakra_Petch({
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
			<html lang="en" data-theme="appTheme">
				<body className={chakraPetch.className}>
					<main>{children}</main>
				</body>
			</html>
		</StyledComponentsRegistry>
	)
}

import './globals.css'

import { Chakra_Petch } from 'next/font/google'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/src/hoc/Registry'

const chakraPetch = Chakra_Petch({
	weight: '600',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Carlos Aragon',
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

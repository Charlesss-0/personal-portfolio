import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import StyledComponentsRegistry from '@/src/hoc/Registry'

const montserrat = Montserrat({
	weight: '500',
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
				<body className={montserrat.className}>
					<main>{children}</main>
				</body>
			</html>
		</StyledComponentsRegistry>
	)
}

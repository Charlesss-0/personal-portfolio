'use client'

import { Contact, Footer, Hero, Navbar, Portfolio } from '@/src/components'

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Portfolio />
			<Contact />
			<Footer />
		</>
	)
}

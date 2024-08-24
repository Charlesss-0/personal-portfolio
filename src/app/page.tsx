'use client'

import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Portfolio } from '@/components/portfolio'

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

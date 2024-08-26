import { useEffect, useState } from 'react'

export default function useActiveSection() {
	const [activeSection, setActiveSection] = useState<string>('hero')

	useEffect(() => {
		const handleScroll = () => {
			const sections = document.querySelectorAll('div[id]')
			let currentSection = ''

			sections.forEach(section => {
				const rect = section.getBoundingClientRect()
				if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
					currentSection = section.id
				}
			})

			setActiveSection(currentSection)
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return { activeSection }
}

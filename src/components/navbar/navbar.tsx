import { NavLink, NavbarContainer } from './navbar.styles'

import { navLinks } from './navbar-data'
import { useActiveSection } from '@/hooks'

export default function Navbar() {
	const { activeSection } = useActiveSection()

	return (
		<NavbarContainer>
			<ul className="flex justify-around font-bold text-xl [&>li>a]:cursor-pointer md:flex-col-reverse md:items-center md:gap-1">
				{navLinks.map(link => (
					<a key={link.id} href={`#${link.id}`}>
						<NavLink
							key={link.id}
							$active={activeSection === link.id}
							className={`${activeSection === link.id ? 'text-base-100' : 'text-neutral-content'}`}
						>
							{link.name}
						</NavLink>
					</a>
				))}
			</ul>
		</NavbarContainer>
	)
}

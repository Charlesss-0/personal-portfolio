import { navLinks } from '@/src/data'
import styled from 'styled-components'
import { useActiveSection } from '@/src/hooks'

const NavbarContainer = styled.nav`
	position: fixed;
	top: 0;
	right: 0;
	color: #fff;
	width: 100vh;
	padding: 1.5rem;
	transform: rotate(-90deg) translateY(-100%);
	transform-origin: top right;
`

const NavLink = styled.li<{ $active: boolean }>`
	position: relative;
	display: flex;
	justify-content: center;
	padding: 0 0.5rem;

	&::after {
		content: '';
		position: absolute;
		width: 100%;
		transform: ${props => (props.$active ? 'scaleX(1)' : 'scaleX(0)')};
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		transform-origin: ${props => (props.$active ? 'bottom left' : 'bottom right')};
		transition: transform 0.25s linear;
	}

	&:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
`

export default function Navbar() {
	const { activeSection } = useActiveSection()

	return (
		<NavbarContainer>
			<ul className="flex justify-around font-bold text-xl [&>li>a]:cursor-pointer">
				{navLinks.map(link => (
					<a key={link.id} href={`#${link.id}`}>
						<NavLink key={link.id} $active={activeSection === link.id}>
							{link.name}
						</NavLink>
					</a>
				))}
			</ul>
		</NavbarContainer>
	)
}

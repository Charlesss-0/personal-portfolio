import { devices } from '@/constants'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
	position: fixed;
	top: 0;
	right: 0;
	color: #fff;
	width: 100vh;
	padding: 1.5rem;
	transform: rotate(-90deg) translateY(-100%);
	transform-origin: top right;
	z-index: 2;

	@media only screen and ${devices.md} {
		transform: none;
		display: flex;
		justify-content: end;
		width: max-content;
		padding: 0.5rem;
	}
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
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		transition: transform 0.25s linear;
		transform-origin: ${props => (props.$active ? 'bottom left' : 'bottom right')};
		transform: ${props => (props.$active ? 'scaleX(1)' : 'scaleX(0)')};
	}

	&:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}

	@media only screen and ${devices.md} {
		width: max-content;
		text-shadow: 1px 1px 3px #000;
		font-size: 1rem;
	}
`

export { NavbarContainer, NavLink }

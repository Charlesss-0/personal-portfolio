import { devices } from '@/constants'
import styled from 'styled-components'

const StyledButton = styled.button`
	font-size: 1rem;
	padding: 0.5rem 4rem;
	transition: all 0.2s ease-in;
	position: relative;
	z-index: 1;
	overflow: hidden;
	outline: 1px solid #fff;

	&:hover {
		color: #011825;
		outline: none;
	}

	&:after {
		content: '';
		background: #fff;
		position: absolute;
		z-index: -1;
		left: -20%;
		right: -20%;
		top: 0;
		bottom: 0;
		transform: skewX(-45deg) scale(0, 1);
		transition: all 0.5s;
	}

	&:hover:after {
		transform: skewX(-45deg) scale(0.75, 1);
	}

	&:active {
		transform: scale(0.95);
	}

	@media only screen and ${devices.md} {
		font-size: 1rem;
		padding: 0.3rem 2rem;
	}
`

export { StyledButton }

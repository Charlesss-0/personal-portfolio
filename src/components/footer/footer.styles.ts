import styled from 'styled-components'

const Link = styled.a`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: #fff;
		transform: scaleX(0);
		transform-origin: bottom right;
		transition: transform 0.25s linear;
	}

	&:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
`

export { Link }

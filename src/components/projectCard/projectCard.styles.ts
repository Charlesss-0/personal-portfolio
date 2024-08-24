import styled from 'styled-components'

const Card = styled.div`
	position: relative;
	transform-style: preserve-3d;
	overflow: hidden;
	border-radius: 1rem;

	&:hover {
		box-shadow: 0 0 50px #fff3, 0 0 50px #fff3, 0 0 50px #fff3;
	}
`

export { Card }

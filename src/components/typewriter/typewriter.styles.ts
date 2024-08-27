import styled, { keyframes } from 'styled-components'

const blink = keyframes`
	25% {
		opacity: 0;
	}

	75% {
		opacity: 1;
	}
`

const Cursor = styled.div`
	width: 15px;
	height: 40%;
	background: #efefef;
	animation: ${blink} 1.3s infinite;
`

export { Cursor }

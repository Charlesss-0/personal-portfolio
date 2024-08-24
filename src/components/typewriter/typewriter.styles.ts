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
	width: 3.5px;
	height: 50%;
	background: #efefef;
	border-radius: 50rem;
	animation: ${blink} 1.3s infinite;
`

export { Cursor }

import styled, { keyframes } from 'styled-components'

import { Button } from '../ui'

const moveDown = keyframes`
    25% {
        transform: translateY(0) translateX(-1px);
        opacity: 1;
    }

    75% {
        transform: translateY(5px) translateX(-1px);
        opacity: 0;
    }
`

const Mouse = styled.div`
	border: 3px solid #efefef;
	border-radius: 20px;
	width: 26px;
	height: 38px;
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	z-index: 10;
	bottom: 3rem;

	&::before {
		content: '';
		height: 7px;
		width: 2px;
		background: #efefef;
		border-radius: 4px;
		position: absolute;
		top: 6px;
		left: 50%;
		transform: translateX(-50%);

		animation: ${moveDown} 2s infinite;
	}
`

export default function MouseIconAnimation({ onclick }: { onclick: () => void }): React.ReactNode {
	return (
		<Button size="icon" variant="ghost" onClick={onclick} asChild>
			<Mouse />
		</Button>
	)
}

import styled, { keyframes } from 'styled-components'

const leap = keyframes`
    0% {
        transform: translateX(0) rotate(0deg);
    }
    
    33.333% {
        transform: translateX(0) rotate(180deg);
    }
    
    66.666% {
        transform: translateX(calc(var(--uib-size) * -0.4)) rotate(180deg);
    }
    
    99.999% {
        transform: translateX(calc(var(--uib-size) * -0.8)) rotate(180deg);
    }
    
    100% {
        transform: translateX(0) rotate(0deg);
    }
`

const Container = styled.div`
	--uib-size: 40px;
	--uib-speed: 2s;
	--uib-color: #efefef;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: var(--uib-size);
	height: var(--uib-size);
	align-self: center;

	& > div {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
	}

	& > div::before {
		content: '';
		display: block;
		height: calc(var(--uib-size) * 0.22);
		width: calc(var(--uib-size) * 0.22);
		border-radius: 50%;
		background-color: var(--uib-color);
		will-change: transform;
	}

	& > div:nth-child(1) {
		animation: ${leap} var(--uib-speed) ease infinite;
	}

	& > div:nth-child(2) {
		transform: translateX(calc(var(--uib-size) * 0.4));
		animation: ${leap} var(--uib-speed) ease calc(var(--uib-speed) / -1.5)
			infinite;
	}

	& > div:nth-child(3) {
		transform: translateX(calc(var(--uib-size) * 0.8)) rotate(0deg);
		animation: ${leap} var(--uib-speed) ease calc(var(--uib-speed) / -3)
			infinite;
	}
`

export default function Loader() {
	return (
		<Container>
			<div></div>
			<div></div>
			<div></div>
		</Container>
	)
}

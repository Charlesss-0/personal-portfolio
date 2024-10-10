import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;

	.spinner {
		width: 56px;
		height: 56px;
		display: grid;
		border: 3px solid transparent;
		border-radius: 50%;
		border-right-color: #efefef;
		animation: spinner-a4dj62 1s infinite linear;
	}

	.spinner::before,
	.spinner::after {
		content: '';
		grid-area: 1/1;
		margin: 2px;
		border: inherit;
		border-radius: 50%;
		animation: spinner-a4dj62 2s infinite;
	}

	.spinner::after {
		margin: 8px;
		animation-duration: 3s;
	}

	@keyframes spinner-a4dj62 {
		100% {
			transform: rotate(1turn);
		}
	}
`

export default function LoaderAnimation(): React.ReactNode {
	return (
		<StyledWrapper>
			<div className="spinner" />
		</StyledWrapper>
	)
}

import { devices, theme } from '@/constants'

import styled from 'styled-components'

const Fieldset = styled.fieldset`
	display: flex;
	position: relative;

	& > label {
		transition: all 400ms;
		position: absolute;
		left: 5px;
		transform: translateY(50%);
		pointer-events: none;
	}

	input,
	textarea {
		background: none;
		outline: none;
		border-bottom: 1px solid ${theme['neutral-content']};
		width: 100%;
		resize: none;
		overflow: hidden;
		padding: 0.5rem;
	}

	input:focus + label,
	textarea:focus + label,
	input:not(:placeholder-shown) + label,
	textarea:not(:placeholder-shown) + label {
		transform: translateY(-100%);
		font-size: 0.8rem;
	}

	@media only screen and ${devices.md} {
		& > label {
			transform: translateY(100%);
			left: 0;
		}

		input:focus + label,
		textarea:focus + label,
		input:not(:placeholder-shown) + label,
		textarea:not(:placeholder-shown) + label {
			transform: translateY(-80%);
		}
	}
`

const Submit = styled.button`
	position: relative;
	background: #fff;
	color: #011825;
	padding: 0.5rem 2rem;
	align-self: end;
	font-weight: bold;
	transition: all 0.3s ease-in-out;
	-webkit-mask: linear-gradient(-45deg, transparent 5%, #fff 5%, #fff 95%, transparent 95%);
	mask: linear-gradient(-45deg, transparent 5%, #fff 5%, #fff 95%, transparent 95%);

	&:hover {
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}

	&:disabled {
		background-color: #afafaf;
		transform: scale(1);
	}

	@media only screen and ${devices.md} {
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
	}
`

export { Fieldset, Submit }

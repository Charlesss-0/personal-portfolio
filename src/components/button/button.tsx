import React from 'react'
import { StyledButton } from './button.styles'

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<StyledButton>
			<span>{children}</span>
		</StyledButton>
	)
}

export default Button

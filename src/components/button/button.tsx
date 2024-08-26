import React from 'react'
import { StyledButton } from './button.styles'

export default function Button({ children }: { children: React.ReactNode }) {
	return (
		<StyledButton>
			<span>{children}</span>
		</StyledButton>
	)
}

import { type MotionProps, motion } from 'framer-motion'
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

type MouseAnimationProps = MotionProps & {
	onClick: () => void
}

export default function MouseAnimation({
	onClick,
	style,
	...props
}: MouseAnimationProps): React.ReactNode {
	return (
		<Button
			size="icon"
			variant="ghost"
			className="fixed left-1/2 translate-x-[-50%] bottom-10"
			onClick={onClick}
			asChild
		>
			<motion.div
				style={{
					opacity: style?.opacity,
					display: style?.display,
					transform: `translateY(-${style?.translateY}px)`,
				}}
				{...props}
			>
				<Mouse />
			</motion.div>
		</Button>
	)
}

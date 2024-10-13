import styled, { keyframes } from 'styled-components'

import { Button } from '../ui'
import { cn } from '@/lib/utils'
import { motion, type MotionProps } from 'framer-motion'

type MouseAnimationProps = MotionProps & {
	onclick: () => void
	className?: string
}

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

export default function MouseAnimation({
	onclick,
	className,
	...props
}: MouseAnimationProps): React.ReactNode {
	return (
		<motion.div className={cn('fixed left-1/2 translate-x-[-50%] bottom-10', className)} {...props}>
			<Button size="icon" variant="ghost" onClick={onclick}>
				<Mouse />
			</Button>
		</motion.div>
	)
}
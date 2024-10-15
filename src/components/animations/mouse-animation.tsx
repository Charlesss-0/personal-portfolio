import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function MouseAnimation(): React.ReactNode {
	const wheel = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		gsap.fromTo(
			wheel.current,
			{
				duration: 2,
				y: 0,
				opacity: 1,
			},
			{
				duration: 2,
				y: 5,
				opacity: 0,
				repeat: -1,
			}
		)
	})

	return (
		<div className="border-[3px] border-neutral-200 rounded-[20px] w-[26px] h-[38px] relative">
			<div
				ref={wheel}
				className="absolute h-[7px] w-[2px] bg-light-blue rounded-[4px] top-[6px] left-[50%] translate-x-[-50%]"
			/>
		</div>
	)
}

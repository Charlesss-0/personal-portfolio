import { useContactAction, useInViewport } from '@/hooks'
import { useEffect, useRef, useState } from 'react'

import ContactForm from './ContactForm'
import { motion } from 'framer-motion'
import { slideVariants } from './contact-constants'

export default function Contact(): React.ReactNode {
	const containerRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { isSending, success, textareaValue, setTextareaValue, handleSubmit } = useContactAction(
		formRef,
		textareaRef
	)
	const isInViewport = useInViewport(containerRef, false, { threshold: 0.8 })
	const [animationTriggered, setAnimationTriggered] = useState<boolean>(false)

	useEffect(() => {
		if (isInViewport && !animationTriggered) {
			setAnimationTriggered(true)
		}
	}, [isInViewport, animationTriggered])

	return (
		<div
			ref={containerRef}
			className="z-10 flex items-center justify-center w-full h-screen text-gray-50"
		>
			{success ? (
				<h2 className="relative z-10 overflow-hidden text-4xl">
					Thanks for reaching out!
					{isInViewport && (
						<motion.div
							className="absolute top-0 left-0 z-10 w-full h-full bg-light-blue"
							variants={slideVariants}
							initial="initial"
							animate="animate"
						/>
					)}
				</h2>
			) : (
				<div className="w-2/4">
					<div className="flex flex-col justify-start gap-2 pb-5 mb-20">
						<h2 className="relative self-start overflow-hidden text-4xl font-semibold max-auto">
							Say Hello
							{animationTriggered && (
								<motion.div
									className="absolute top-0 left-0 z-10 w-full h-full bg-light-blue"
									variants={slideVariants}
									initial="initial"
									animate="animate"
								/>
							)}
						</h2>

						<div>
							<div className="w-full border-b-2 border-light-blue" />
							<div
								className="w-32 h-3 bg-light-blue"
								style={{
									clipPath: 'polygon(0 -1px,100% -1px,calc(100% - 10px) 100%,10px 100%)',
								}}
							/>
						</div>
					</div>

					<ContactForm
						formRef={formRef}
						textareaRef={textareaRef}
						handleSubmit={handleSubmit}
						isSending={isSending}
						setTextareaValue={setTextareaValue}
						textareaValue={textareaValue}
						animationTriggered={animationTriggered}
					/>
				</div>
			)}
		</div>
	)
}

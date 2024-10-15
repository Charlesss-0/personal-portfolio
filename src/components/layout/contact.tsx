import { useContactAction, useInViewport } from '@/hooks'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { LoaderAnimation } from '@/components/animations'
import { motion } from 'framer-motion'

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
	const [focusedElement, setFocusedElement] = useState<string | null>(null)

	const formInputElements = useMemo(
		() => [
			{
				id: 'Fullname',
				element: 'input',
				label: 'Full Name',
				type: 'text',
			},
			{
				id: 'Email',
				element: 'input',
				label: 'Your email',
				type: 'email',
			},
			{
				id: 'Message',
				element: 'textarea',
				label: 'Message',
				type: 'text',
			},
		],
		[]
	)

	useEffect(() => {
		if (isInViewport && !animationTriggered) {
			setAnimationTriggered(true)
		}
	}, [isInViewport, animationTriggered])

	const slideVariants = useMemo(
		() => ({
			initial: { x: '-101%' },
			animate: { x: '101%', transition: { duration: 1, ease: 'easeInOut', type: 'tween' } },
		}),
		[]
	)

	const lineVariants = {
		initial: { width: '0%' },
		expanded: { width: '100%', transition: { duration: 0.6, ease: 'easeInOut' } },
		compressed: { width: '0%', transition: { duration: 0.6, ease: 'easeInOut' } },
	}

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

					<form
						method="POST"
						ref={formRef}
						onSubmit={handleSubmit}
						className="flex flex-col gap-16 md:gap-10"
					>
						{formInputElements.map((input, i) => (
							<fieldset key={i} className="relative flex flex-col">
								{input.element === 'input' ? (
									<>
										<input
											type={input.type}
											id={input.id}
											name={input.id}
											placeholder=" "
											autoComplete="off"
											maxLength={100}
											className="w-full px-2 overflow-hidden font-semibold origin-left bg-transparent border-b-2 outline-none text-neutral-50 peer"
											onFocus={() => setFocusedElement(input.id)}
											onBlur={() => setFocusedElement(null)}
											required
										/>
										<motion.div
											className="absolute bottom-0 left-0 h-[2px] bg-light-blue"
											variants={lineVariants}
											initial="initial"
											animate={focusedElement === input.id ? 'expanded' : 'compressed'}
										/>
									</>
								) : (
									<>
										<textarea
											ref={textareaRef}
											id={input.id}
											name={input.id}
											value={textareaValue}
											placeholder=" "
											autoComplete="off"
											maxLength={300}
											onChange={e => setTextareaValue(e.target.value)}
											className="w-full px-2 overflow-hidden font-semibold bg-transparent border-b-2 outline-none resize-none text-neutral-50 peer"
											onFocus={() => setFocusedElement(input.id)}
											onBlur={() => setFocusedElement(null)}
											required
										/>
										<motion.div
											className="absolute bottom-0 left-0 h-[2px] bg-light-blue"
											variants={lineVariants}
											initial="initial"
											animate={focusedElement === input.id ? 'expanded' : 'compressed'}
										/>
									</>
								)}
								<label
									htmlFor={input.id}
									className="absolute font-semibold transition-all duration-300 translate-y-[-100%] pointer-events-none left-2 peer-placeholder-shown:translate-y-[-15%] peer-placeholder-shown:text-lg peer-focus:-translate-y-full peer-focus:text-base peer-focus:text-light-blue overflow-hidden"
								>
									{input.label}

									{animationTriggered && (
										<motion.div
											className="absolute top-0 left-0 z-10 w-full h-full bg-light-blue"
											variants={slideVariants}
											initial="initial"
											animate="animate"
										/>
									)}
								</label>
							</fieldset>
						))}

						<Button variant="outline" type="submit" disabled={isSending} className="self-end">
							{isSending ? 'Sending...' : 'Send Message'}
						</Button>

						{isSending && <LoaderAnimation />}
					</form>
				</div>
			)}
		</div>
	)
}

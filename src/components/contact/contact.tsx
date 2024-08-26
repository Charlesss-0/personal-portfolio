import { ContactSection, Fieldset, Submit } from './contact.styles'
import { MotionProps, motion } from 'framer-motion'

import { Loader } from '../loader'
import { formInputElements } from './contact-data'
import { useContactAction } from '@/hooks'
import { useRef } from 'react'

const motionProps: MotionProps = {
	initial: { opacity: 0, y: '100%' },
	whileInView: { opacity: 1, y: 0 },
	transition: { type: 'tween' },
	viewport: { once: true },
}

const Contact = () => {
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { isSending, success, textareaValue, setTextareaValue, handleSubmit } = useContactAction(
		formRef,
		textareaRef
	)

	return (
		<ContactSection id="contact">
			{success ? (
				<h1 className="text-2xl">Thanks for reaching out!</h1>
			) : (
				<>
					<motion.div className="w-2/4 p-2 md:w-full" {...motionProps}>
						<div className="pb-5 mb-20 border-b-2 md:mb-16">
							<h1 className="text-2xl md:text-xl">Say Hello</h1>
						</div>

						<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-16 md:gap-10">
							{formInputElements.map((input, i) => (
								<Fieldset key={i}>
									{input.element === 'input' ? (
										<input
											type={input.type}
											id={input.id}
											name={input.id}
											placeholder=" "
											autoComplete="off"
											maxLength={100}
											required
										/>
									) : (
										<textarea
											ref={textareaRef}
											id={input.id}
											name={input.id}
											value={textareaValue}
											placeholder=" "
											autoComplete="off"
											maxLength={300}
											onChange={e => setTextareaValue(e.target.value)}
											required
										></textarea>
									)}
									<label htmlFor={input.id} className="md:text-[0.8rem]">
										{input.label}
									</label>
								</Fieldset>
							))}

							<Submit type="submit" disabled={isSending}>
								{isSending ? 'Sending...' : 'Send Message'}
							</Submit>

							{isSending && <Loader />}
						</form>
					</motion.div>
				</>
			)}
		</ContactSection>
	)
}

export default Contact

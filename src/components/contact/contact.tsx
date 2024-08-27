import { Fieldset, Submit } from './contact.styles'

import { Loader } from '../loader'
import { formInputElements } from './contact-data'
import { useContactAction } from '@/hooks'
import { useRef } from 'react'

const Contact = () => {
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { isSending, success, textareaValue, setTextareaValue, handleSubmit } = useContactAction(
		formRef,
		textareaRef
	)

	if (success) {
		return (
			<div className="z-10 flex items-center justify-center w-full h-full">
				<h1 className="text-2xl">Thanks for reaching out!</h1>
			</div>
		)
	}

	return (
		<div className="z-10 flex items-center justify-center w-full h-full">
			<div className="w-2/4">
				<div className="pb-5 mb-10 border-b-2">
					<h1 className="text-3xl">Say Hello</h1>
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
			</div>
		</div>
	)
}

export default Contact

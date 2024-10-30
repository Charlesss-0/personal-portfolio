import { Button, Loader } from '@/components/ui'

import InputField from './InputField'
import LabelField from './LabelField'
import TextareaField from './TextareaField'
import { formInputElements } from './contact-constants'
import { useState } from 'react'

interface ContactFormProps {
	formRef: React.RefObject<HTMLFormElement>
	textareaRef: React.RefObject<HTMLTextAreaElement>
	handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>
	isSending: boolean
	setTextareaValue: (value: string) => void
	textareaValue: string
	animationTriggered: boolean
}

export default function ContactForm({
	formRef,
	textareaRef,
	handleSubmit,
	isSending,
	setTextareaValue,
	textareaValue,
	animationTriggered,
}: ContactFormProps): React.ReactNode {
	const [focusedElement, setFocusedElement] = useState<string | null>(null)

	return (
		<form
			method="POST"
			ref={formRef}
			onSubmit={handleSubmit}
			className="flex flex-col gap-16 md:gap-10"
		>
			{formInputElements.map((input, i) => (
				<fieldset key={i} className="relative flex flex-col">
					{input.element === 'input' ? (
						<InputField
							input={input}
							focusedElement={focusedElement}
							setFocusedElement={setFocusedElement}
						/>
					) : (
						<TextareaField
							textareaRef={textareaRef}
							input={input}
							textareaValue={textareaValue}
							setTextareaValue={setTextareaValue}
							focusedElement={focusedElement}
							setFocusedElement={setFocusedElement}
						/>
					)}
					<LabelField input={input} animationTriggered={animationTriggered} />
				</fieldset>
			))}

			<Button variant="outline" type="submit" disabled={isSending} className="self-end">
				{isSending ? 'Sending...' : 'Send Message'}
			</Button>

			{isSending && <Loader />}
		</form>
	)
}

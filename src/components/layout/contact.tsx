import { useMemo, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { LoaderAnimation } from '@/components/animations'
import { useContactAction } from '@/hooks'

export default function Contact(): React.ReactNode {
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { isSending, success, textareaValue, setTextareaValue, handleSubmit } = useContactAction(
		formRef,
		textareaRef
	)
	const formInputElements = useMemo(
		() => [
			{
				element: 'input',
				label: 'Full Name',
				type: 'text',
				id: 'Fullname',
			},
			{
				element: 'input',
				label: 'Your email',
				type: 'email',
				id: 'Email',
			},
			{
				element: 'textarea',
				label: 'Message',
				type: 'text',
				id: 'Message',
			},
		],
		[]
	)

	if (success) {
		return (
			<div className="z-10 flex items-center justify-center w-full h-screen">
				<h1 className="z-10 text-2xl">Thanks for reaching out!</h1>
			</div>
		)
	}

	return (
		<div className="flex items-center justify-center w-full h-screen text-gray-50">
			<div className="w-2/4">
				<div className="pb-5 mb-10 border-b-2">
					<h1 className="text-3xl font-semibold">Say Hello</h1>
				</div>

				<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-16 md:gap-10">
					{formInputElements.map((input, i) => (
						<fieldset key={i} className="relative flex flex-col">
							{input.element === 'input' ? (
								<input
									type={input.type}
									id={input.id}
									name={input.id}
									placeholder=" "
									autoComplete="off"
									maxLength={100}
									className="w-full px-2 overflow-hidden text-gray-300 bg-transparent outline-none peer outline"
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
									className="w-full px-2 overflow-hidden text-gray-300 bg-transparent outline-none resize-none peer outline"
									required
								/>
							)}
							<label
								htmlFor={input.id}
								className="absolute transition-all duration-300 translate-y-[-100%] pointer-events-none left-2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-focus:-translate-y-full peer-focus:text-base"
							>
								{input.label}
							</label>

							<div className="w-full mt-2 border-b border-neutral-100" />
						</fieldset>
					))}

					<Button variant="outline" type="submit" disabled={isSending} className="self-end">
						{isSending ? 'Sending...' : 'Send Message'}
					</Button>

					{isSending && <LoaderAnimation />}
				</form>
			</div>
		</div>
	)
}

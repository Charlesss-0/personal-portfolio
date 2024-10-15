import { useEffect, useState } from 'react'

export default function useContactAction(
	formRef: React.RefObject<HTMLFormElement>,
	textareaRef: React.RefObject<HTMLTextAreaElement>
): {
	isSending: boolean
	success: boolean
	textareaValue: string
	setTextareaValue: (value: string) => void
	handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>
} {
	const [isSending, setIsSending] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [textareaValue, setTextareaValue] = useState<string>('')

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		if (formRef.current) {
			const data = new FormData(formRef.current)
			const actionURL = process.env.NEXT_PUBLIC_FORM_ACTION_URL as string

			if (!actionURL) {
				throw new Error('Form action URL is not defined')
			}

			try {
				setIsSending(true)

				await fetch(actionURL, {
					method: 'POST',
					body: data,
					mode: 'no-cors',
				})

				setSuccess(true)
			} catch (error) {
				setIsSending(false)
				throw new Error(`Unable to send message ${error}`)
			} finally {
				setIsSending(false)
			}
		}
	}

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '0'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}, [textareaValue, textareaRef])

	return { isSending, success, textareaValue, setTextareaValue, handleSubmit }
}

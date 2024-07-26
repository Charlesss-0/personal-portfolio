import React, { useEffect, useState } from 'react'

export default function useContactAction(
	formRef: React.RefObject<HTMLFormElement>,
	textareaRef: React.RefObject<HTMLTextAreaElement>
) {
	const [isSending, setIsSending] = useState<boolean>(false)
	const [success, setSuccess] = useState<boolean>(false)
	const [textareaValue, setTextareaValue] = useState<string>('')

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (formRef.current) {
			const data = new FormData(formRef.current)
			const action = process.env.NEXT_PUBLIC_FORM_ACTION_URL!

			try {
				setIsSending(!isSending)

				const response = await fetch(action, {
					method: 'POST',
					body: data,
				})

				if (response.ok) {
					setSuccess(true)
				}
			} catch (e) {
				console.error('Unable to send message:', e)
			}
		}
	}

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '0'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}, [textareaValue])

	return { isSending, success, textareaValue, setTextareaValue, handleSubmit }
}

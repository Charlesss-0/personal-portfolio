export interface FormInput {
	id: string
	element: 'input' | 'textarea'
	label: string
	type: string
}

export const formInputElements: FormInput[] = [
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
]

export const slideVariants = {
	initial: { x: '-101%' },
	animate: { x: '101%', transition: { duration: 1, ease: 'easeInOut', type: 'tween' } },
}

export const inputLineVariants = {
	initial: { width: '0%' },
	expanded: { width: '100%', transition: { duration: 0.6, ease: 'easeInOut' } },
	compressed: { width: '0%', transition: { duration: 0.6, ease: 'easeInOut' } },
}

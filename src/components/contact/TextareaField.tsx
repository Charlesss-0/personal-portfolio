import { type FormInput, inputLineVariants } from './contact-constants'
import { motion } from 'framer-motion'

interface TextareaFieldProps {
	textareaRef: React.RefObject<HTMLTextAreaElement>
	input: FormInput
	textareaValue: string
	setTextareaValue: (value: string) => void
	focusedElement: string | null
	setFocusedElement: React.Dispatch<React.SetStateAction<string | null>>
}

export default function TextareaField({
	textareaRef,
	input,
	textareaValue,
	setTextareaValue,
	focusedElement,
	setFocusedElement,
}: TextareaFieldProps): React.ReactNode {
	return (
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
				variants={inputLineVariants}
				initial="initial"
				animate={focusedElement === input.id ? 'expanded' : 'compressed'}
			/>
		</>
	)
}

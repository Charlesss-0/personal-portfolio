import { type FormInput, inputLineVariants } from './contact-constants'
import { motion } from 'framer-motion'

interface InputFieldProps {
	input: FormInput
	focusedElement: string | null
	setFocusedElement: React.Dispatch<React.SetStateAction<string | null>>
}

export default function InputField({
	input,
	focusedElement,
	setFocusedElement,
}: InputFieldProps): React.ReactNode {
	return (
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
				variants={inputLineVariants}
				initial="initial"
				animate={focusedElement === input.id ? 'expanded' : 'compressed'}
			/>
		</>
	)
}

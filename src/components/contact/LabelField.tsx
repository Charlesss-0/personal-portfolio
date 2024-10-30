import { type FormInput, slideVariants } from './contact-constants'
import { motion } from 'framer-motion'

export default function LabelField({
	input,
	animationTriggered,
}: {
	input: FormInput
	animationTriggered: boolean
}): React.ReactNode {
	return (
		<label
			htmlFor={input.id}
			className="absolute font-semibold transition-all duration-300 translate-y-[-100%] pointer-events-none left-2 peer-placeholder-shown:translate-y-[-25%] peer-placeholder-shown:text-lg peer-focus:-translate-y-full peer-focus:text-base peer-focus:text-light-blue overflow-hidden"
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
	)
}

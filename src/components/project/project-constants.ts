export const stagger = {
	hidden: { opacity: 0, y: 50 },
	visible: (i: number): Record<string, any> => ({
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 40,
			damping: 10,
			delay: i * 0.2,
		},
	}),
}

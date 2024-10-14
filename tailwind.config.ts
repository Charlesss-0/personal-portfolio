import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xl: {
					max: '1279px',
				},
				lg: {
					max: '900px',
				},
				md: {
					max: '600px',
				},
				sm: {
					max: '400px',
				},
			},
			fontFamily: {
				'telegraf-regular': ['var(--font-telegraf-regular)', 'sans-serif'],
			},
			keyframes: {
				blink: {
					'25%': {
						opacity: '0',
					},
					'75%': {
						opacity: '1',
					},
				},
			},
			animation: {
				blink: 'blink 1.3s infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				'light-blue': '#00eeff',
			},
		},
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		({ addUtilities }: { addUtilities: any }): void => {
			const newUtilities = {
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none',
				},
				'.no-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
				},
			}

			addUtilities(newUtilities)
		},
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('tailwindcss-animate'),
	],
}
export default config

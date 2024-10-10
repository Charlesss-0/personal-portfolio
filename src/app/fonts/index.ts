import { Chakra_Petch, Montserrat, Poppins } from 'next/font/google'

import localFont from 'next/font/local'

export const telegrafRegular = localFont({
	src: './telegraf/Telegraf-Regular.otf',
	variable: '--font-telegraf-regular',
	display: 'swap',
	preload: true,
})

export const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: '500',
	display: 'swap',
})

export const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: '500',
})

export const chakraPetch = Chakra_Petch({
	subsets: ['latin'],
	variable: '--font-chakra-petch',
	weight: '600',
})

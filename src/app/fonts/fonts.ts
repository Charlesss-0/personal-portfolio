import { Chakra_Petch, Montserrat, Poppins } from 'next/font/google'

import localFont from 'next/font/local'

export const telegrafRegular = localFont({
	src: './Telegraf-Regular.otf',
	variable: '--font-telegraf',
	display: 'swap',
	weight: '400',
})

export const poppins = Poppins({
	style: 'normal',
	weight: '500',
	subsets: ['latin'],
	variable: '--font-poppins',
	display: 'swap',
})

export const montserrat = Montserrat({
	weight: '600',
	subsets: ['latin'],
})

export const chakraPetch = Chakra_Petch({
	weight: '600',
	subsets: ['latin'],
})

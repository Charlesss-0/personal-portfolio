import { Bebas_Neue } from 'next/font/google'
import localFont from 'next/font/local'

export const telegrafRegular = localFont({
	src: './telegraf/Telegraf-Regular.otf',
	variable: '--font-telegraf-regular',
	display: 'swap',
	preload: true,
})

export const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	variable: '--font-bebas-neue',
	display: 'swap',
	weight: '400',
	preload: true,
})

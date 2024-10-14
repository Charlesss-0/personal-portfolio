import { useLenis } from '@studio-freight/react-lenis'

export default function UseLenisScroll(): { scrollTo: (target: string) => void } {
	const lenis = useLenis()

	const scrollTo = (target: string): void => {
		if (!lenis) return

		lenis.scrollTo(target, {
			lerp: 0.05,
			duration: 0.3,
			easing: (x: number): number => {
				return -(Math.cos(Math.PI * x) - 1) / 2
			},
			offset: 0,
		})
	}

	return {
		scrollTo,
	}
}

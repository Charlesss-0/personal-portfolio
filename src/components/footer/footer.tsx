import { Link } from './footer.styles'

export default function Footer() {
	return (
		<section className="p-10 text-base-100 md:p-2 md:text-[0.7rem]">
			<h2 className="flex justify-center gap-1">
				<span>&copy; 2024 Carlos Aragon.</span>
				<Link href="https://github.com/Charlesss-0" target="_blank">
					Crafted by Charlesdev
				</Link>
			</h2>
		</section>
	)
}

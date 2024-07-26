import styled from 'styled-components'

const Link = styled.a`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: #fff;
		transform: scaleX(0);
		transform-origin: bottom right;
		transition: transform 0.25s linear;
	}

	&:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
`

export default function Footer() {
	return (
		<section className="p-10 text-base-100">
			<h2 className="flex gap-1 justify-center">
				<span>&copy; 2024 Carlos Aragon.</span>
				<Link href="https://github.com/Charlesss-0" target="_blank">
					Crafted by Charlesdev
				</Link>
			</h2>
		</section>
	)
}

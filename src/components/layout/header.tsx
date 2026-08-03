import Link from "next/link";

export default function Header(): React.ReactNode {
	const navItems = [
		{ name: "Work", href: "#projects" },
		{ name: "Blogs", href: "#" },
	];

	return (
		<header className="sticky top-0 z-10 flex items-center justify-around p-4 text-sm border-b border-base-300 backdrop-blur-md bg-base-100/60">
			<Link className="flex items-center gap-2 font-mono" href="/">
				<span className="w-2 h-2 rounded-full bg-accent" />
				Carlos.Aragon
			</Link>

			<div className="flex items-center gap-4 md:gap-8">
				<nav className="flex items-center gap-4">
					{navItems.map((navItem, index) => (
						<Link
							key={index}
							href={navItem.href}
							className="transition-all hover:underline decoration-2 decoration-accent underline-offset-4"
						>
							{navItem.name}
						</Link>
					))}
				</nav>

				<Link type="button" className="btn btn-primary" href="#contact-info">
					Get in touch
				</Link>
			</div>
		</header>
	);
}

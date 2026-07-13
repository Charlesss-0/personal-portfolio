export default function Header(): React.ReactNode {
	return (
		<header className="sticky top-0 z-10 flex items-center justify-around p-4 text-sm border-b border-base-300 backdrop-blur-md bg-base-100/60">
			<p className="flex items-center gap-2 font-mono">
				<span className="w-2 h-2 rounded-full bg-accent" />
				Carlos.Aragon
			</p>

			<nav className="flex items-center gap-4">
				<p>Work</p>
				<p>About</p>
				<p>Stack</p>
				<p>Contact</p>
			</nav>

			<button type="button" className="btn btn-primary">
				Get in touch
			</button>
		</header>
	);
}

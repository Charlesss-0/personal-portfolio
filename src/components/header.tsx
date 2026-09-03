import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import twMerge from "@/utils/tw-merge";

export default function Header(): React.ReactNode {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navItems = [
		{ name: "Work", href: "#projects" },
		{ name: "Blog", href: "/blog" },
	];

	return (
		<>
			<header className="sticky top-0 z-10 flex items-center justify-between p-4 text-sm border-b md:justify-around border-secondary-content backdrop-blur-md bg-base-100/80">
				<Link className="flex items-center font-mono gap-2" href="/">
					<span className="w-2 h-2 rounded-full bg-accent" />
					Carlos.Aragon
				</Link>

				<div className="items-center hidden gap-4 md:flex md:gap-8">
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

				<button
					type="button"
					className="h-auto p-2 btn btn-ghost md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-expanded={isMenuOpen}
					aria-label="Toggle menu"
				>
					<IoMenu size={24} />
				</button>
			</header>

			<div
				className={twMerge(
					"fixed inset-0 bg-black/50 md:hidden z-20 backdrop-blur-xs",
					isMenuOpen ? "block" : "hidden",
				)}
				onClick={() => setIsMenuOpen(false)}
				aria-hidden={!isMenuOpen}
			/>

			<div
				className={twMerge(
					"fixed top-0 left-0 bottom-0 md:hidden transition-all duration-300 z-30 ease-in-out -translate-x-full opacity-0",
					isMenuOpen && "translate-0 opacity-100",
				)}
			>
				<nav className="flex flex-col h-full p-6 gap-6 w-62 bg-base-100">
					{navItems.map((navItem, index) => (
						<Link
							key={index}
							href={navItem.href}
							onClick={() => setIsMenuOpen(false)}
						>
							{navItem.name}
						</Link>
					))}

					<Link
						type="button"
						className="btn btn-primary"
						href="#contact-info"
						onClick={() => setIsMenuOpen(false)}
					>
						Get in touch
					</Link>
				</nav>
			</div>
		</>
	);
}

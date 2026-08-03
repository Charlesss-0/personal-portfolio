import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SiGithub } from "react-icons/si";

export default function Footer(): React.ReactNode {
	return (
		<footer
			id="contact-info"
			className="flex flex-col items-center font-serif bg-primary text-primary-content"
		>
			<div className="flex items-center justify-around w-full max-w-6xl px-6 py-4 md:px-8 md:py-18">
				<div>
					<p className="mb-4 font-mono text-sm text-base-300 md:mb-8">
						Contact
					</p>

					<h2 className="text-3xl tracking-tight md:text-8xl">
						Have something <br />
						<span className="italic text-accent">worth building?</span>
					</h2>
				</div>

				<div className="mt-4 space-y-2 md:text-2xl md:mt-6 md:space-y-4">
					<Link
						href="mailto:aragonaugusto24@gmail.com"
						className="flex items-center gap-2 transition-colors cursor-pointer decoration-2 decoration-accent-content hover:text-accent"
					>
						<IoIosMail />
						<span>aragonaugusto24@gmail.com</span>
					</Link>

					<Link
						href="https://github.com/Charlesss-0"
						className="flex items-center gap-2 transition-colors cursor-pointer decoration-2 decoration-accent-content hover:text-accent"
						target="_blank"
						rel="noopener noreferrer"
					>
						<SiGithub />
						<span>github.com/Charlesss-0</span>
					</Link>

					<Link
						href="https://www.linkedin.com/in/carlosaragondev"
						className="flex items-center gap-2 transition-colors cursor-pointer decoration-2 decoration-accent-content hover:text-accent"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedinIn />
						<span>linkedin.com/in/carlosaragondev</span>
					</Link>
				</div>
			</div>

			<div className="w-full border-b border-secondary" />

			<div className="px-6 py-2 font-mono text-sm md:px-8 md:py-4 text-base-300">
				<p>© {new Date().getFullYear()} Carlos Aragon</p>
			</div>
		</footer>
	);
}

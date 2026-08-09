import "./globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import {
	Instrument_Serif,
	JetBrains_Mono,
	Space_Grotesk,
} from "next/font/google";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
});

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal", "italic"],
	variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	variable: "--font-mono-jetbrains",
});

export const metadata: Metadata = {
	title: "Carlos Aragon",
	description:
		"Carlos Aragon is a web developer specializing in modern frontend development, conversion optimization, and analytics. Building fast, scalable websites and web applications with Next.js, React, TypeScript, and Tailwind CSS.",
	generator: "Next.js",
	verification: {
		google: process.env.NEXT_PUBLIC_SITE_VERIFICATION,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode {
	return (
		<html
			lang="en"
			data-theme="lofi"
			className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased no-scrollbar`}
			data-scroll-behavior="smooth"
		>
			<body>
				<main>{children}</main>
			</body>

			<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
		</html>
	);
}

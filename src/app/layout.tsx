import "./globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import {
	Instrument_Serif,
	JetBrains_Mono,
	Space_Grotesk,
} from "next/font/google";
import config from "@/data/config.json";

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
	title: config.name,
	description: config.description,
	generator: "Next.js",
	verification: {
		google: config.googleSiteVerification,
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
		>
			<body>
				<main>{children}</main>
			</body>

			<GoogleTagManager gtmId="GTM-PVPT4FJ5" />
		</html>
	);
}

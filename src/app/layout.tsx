import "./globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import config from "@/data/config.json";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-sans",
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
			className={`${spaceGrotesk.variable} antialiased no-scrollbar`}
		>
			<body>
				<main>{children}</main>
			</body>

			<GoogleTagManager gtmId="GTM-PVPT4FJ5" />
		</html>
	);
}

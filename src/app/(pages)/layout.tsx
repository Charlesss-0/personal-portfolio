import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Projects",
	description: "Things I've built",
};

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

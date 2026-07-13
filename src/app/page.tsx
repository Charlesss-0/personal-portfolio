"use client";

import { Header, Hero, Marquee, Projects } from "@/components/layout";

export default function Home(): React.ReactNode {
	return (
		<div>
			<Header />
			<Hero />
			<Marquee />
			<Projects />
		</div>
	);
}

"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Marquee from "@/components/layout/marquee";
import Projects from "@/components/layout/projects";

export default function Home(): React.ReactNode {
	return (
		<div>
			<Header />
			<Hero />
			<Marquee />
			<Projects />
			<Footer />
		</div>
	);
}

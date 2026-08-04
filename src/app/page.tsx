"use client";

import About from "@/components/layout/about";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Marquee from "@/components/layout/marquee";
import Projects from "@/components/layout/projects-wrapper";

export default function Home(): React.ReactNode {
	return (
		<div>
			<Header />
			<Hero />
			<Marquee />
			<Projects />
			<About />
			<Footer />
		</div>
	);
}

"use client";

import About from "@/components/about";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Projects from "@/components/projects-wrapper";

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

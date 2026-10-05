import About from "@/components/about";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import ProjectsWrapper from "@/components/projects/projects-wrapper";

export default function Home(): React.ReactNode {
	return (
		<div>
			<Header />
			<Hero />
			<Marquee />
			<ProjectsWrapper />
			<About />
			<Footer />
		</div>
	);
}

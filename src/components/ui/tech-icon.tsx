"use client";

import type { IconType } from "react-icons";
import {
	SiAxios,
	SiExpo,
	SiExpress,
	SiFigma,
	SiFirebase,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiRedux,
	SiStyledcomponents,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";

const brandIcons: Record<string, IconType> = {
	expo: SiExpo,
	figma: SiFigma,
	nextjs: SiNextdotjs,
	nodejs: SiNodedotjs,
	react: SiReact,
	redux: SiRedux,
	tailwindcss: SiTailwindcss,
	typescript: SiTypescript,
	expressjs: SiExpress,
	styledcomponents: SiStyledcomponents,
	firebase: SiFirebase,
	mongodb: SiMongodb,
	axios: SiAxios,
};

type TechName = keyof typeof brandIcons;

export type TechIconProps = {
	name: TechName;
	size?: number;
	className?: string;
};

export default function TechIcon({
	name,
	size,
	className,
}: TechIconProps): React.ReactNode {
	const Icon = brandIcons[name];

	if (!Icon) {
		console.warn(`TechIcon: Icon not found for ${name}`);
		return null;
	}

	return <Icon size={size} className={className} />;
}

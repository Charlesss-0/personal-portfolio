const projects = [
	{
		id: "trackwise",
		name: "Trackwise",
		tagline: "Take control of your financial future.",
		overview:
			"Trackwise is a personal finance app for managing accounts, transactions, recurring bills, and debts across multiple currencies. It was built for everyday use in a dual-currency household, so USD and NIO needed to work side by side without requiring constant manual conversions. The goal was to keep the experience fast and simple enough to check every day, much like a banking app.",
		approach: [
			{
				step: "01",
				text: "Built on Next.js 16 App Router with Supabase (PostgreSQL + Row-Level Security) so every user's financial data stays isolated at the database layer, not just the app layer.",
			},
			{
				step: "02",
				text: "Modeled accounts, categories, transactions, and debts as separate entities with auto-provisioned categories, so a new user gets a usable dashboard without setup friction.",
			},
			{
				step: "03",
				text: "Wired an auto-fetched USD→NIO exchange rate with manual override, so multi-currency totals stay accurate without babysitting the rate.",
			},
			{
				step: "04",
				text: "Used TanStack React Query for server state and Zustand for UI state, keeping data fetching and interface logic cleanly separated.",
			},
			{
				step: "05",
				text: "Built a responsive layout, sidebar on desktop, bottom tab nav on mobile.",
			},
		],
		description:
			"A full-featured personal finance tracker built to manage day-to-day money across multiple accounts and currencies. Users can log debit, credit, cash, and savings accounts, categorize income and expenses with custom color-coded tags, and track recurring bills on weekly, biweekly, monthly, or yearly schedules. Debts are tracked individually, creditor, balance, monthly payment, due date,with visual progress toward payoff. Because USD and NIO transactions coexist in the same household, the app auto-fetches exchange rates (with manual override) so the net worth dashboard reflects true totals in one currency, not an assortment of unconverted balances.",
		img: "/images/trackwise.png",
		stack: [
			"nextjs",
			"react",
			"typescript",
			"supabase",
			"tailwindcss",
			"tanstack-query",
		],
		githubUrl: "https://github.com/Charlesss-0/trackwise",
		btnText: "View Project",
	},
	{
		id: "blossom-dental",
		name: "Blossom Dental",
		tagline: "A clinic website built to convert visits into appointments.",
		overview:
			"Blossom Dental is the marketing site for a dental clinic. The brief was straightforward but unforgiving: make it easy for someone in pain or seeking care to find the right service and book, in Spanish, on mobile, with minimal friction between landing on the page and reaching the clinic.",
		approach: [
			{
				step: "01",
				text: "Built on Next.js 16 App Router with statically generated service detail pages, so all six service pages load instantly and are fully indexable.",
			},
			{
				step: "02",
				text: "Wired WhatsApp CTAs with pre-filled messages tied to GTM events, turning every 'Book Now' click into both a conversion and a tracked event.",
			},
			{
				step: "03",
				text: "Implemented structured data (Dentist schema via schema-dts), Spanish metadata, Open Graph tags, and an auto-generated sitemap for local SEO.",
			},
			{
				step: "04",
				text: "Styled with Tailwind CSS v4 and shadcn/ui on top of Radix primitives, with Framer Motion for section transitions and a mobile-first collapsible nav.",
			},
		],
		description:
			"A modern marketing website for a dental clinic in Managua, Nicaragua, with a services grid, dynamic service detail pages, WhatsApp booking CTAs with GTM tracking, and full Spanish-language SEO.",
		img: "/images/blossom-dental.png",
		stack: [
			"nextjs",
			"react",
			"typescript",
			"tailwindcss",
			"framer-motion",
			"shadcn-ui",
		],
		githubUrl: "https://github.com/Charlesss-0/blossom-dental",
		btnText: "View Project",
	},
	{
		id: "impostor-game",
		name: "Word Impostor",
		tagline: "One player doesn't know the word. Find them.",
		overview:
			"Word Impostor is a real-time multiplayer party game where one player secretly doesn't know the round's word and has to bluff their way through description and voting. Built mobile-first as an installable PWA with a Spanish-language UI, it needed low-latency state sync across every player's phone in the same room, with zero accounts, since party games die the moment you ask people to sign up.",
		approach: [
			{
				step: "01",
				text: "Built on Next.js 16 App Router with Supabase Realtime subscriptions to sync distribution, discussion, voting, and reveal phases live across all connected players.",
			},
			{
				step: "02",
				text: "Skipped authentication entirely — player identity is tracked via a UUID in localStorage, and host duties auto-reassign if the original host leaves.",
			},
			{
				step: "03",
				text: "Implemented a timed round structure (distribution, discussion, voting, reveal) with configurable durations and scoring, driven by shared game-state hooks.",
			},
			{
				step: "04",
				text: "Shipped it as a PWA with a service worker and offline cache strategy, plus a dark, glassmorphism mobile UI, so it installs and feels like a native app at the table.",
			},
		],
		description:
			"A real-time multiplayer party game about deception and deduction: each round one player is secretly the Impostor and must blend in without knowing the word. Mobile-optimized, installable as a PWA, with a fully Spanish UI.",
		img: "/images/word-impostor.png",
		stack: ["nextjs", "react", "typescript", "supabase", "tailwindcss"],
		githubUrl: "https://github.com/Charlesss-0/impostor-game",
		btnText: "View Project",
	},
	{
		id: "payload",
		name: "Payload",
		tagline: "Turn raw JSON into something readable.",
		overview:
			"Payload is a Chrome extension that replaces the browser's default plain-text JSON view with a proper inspector, tree, raw, and table views, smart value detection, and ten themes. It came out of the daily annoyance of squinting at unformatted API responses while debugging, and the goal was something that felt native to DevTools rather than bolted on.",
		approach: [
			{
				step: "01",
				text: "Built as a Manifest V3 Chrome extension with React 19 and TypeScript, using Vite and CRXjs for a fast dev/build loop.",
			},
			{
				step: "02",
				text: "Detected JSON responses in the page body and mounted the inspector inside a Shadow DOM, so its styles never leak into or clash with the host page.",
			},
			{
				step: "03",
				text: "Built three view modes — an expandable tree, a syntax-highlighted raw view, and a sortable table view with smart suggestion for uniform arrays.",
			},
			{
				step: "04",
				text: "Added smart value detection (dates with relative-time tooltips, clickable URLs, hex color swatches) and persisted theme and view preferences to chrome.storage.local.",
			},
		],
		description:
			"A Chrome extension (Manifest V3) that automatically detects JSON responses and replaces the browser's default view with a feature-rich inspector — tree, raw, and table views, search, ten themes, and smart value detection.",
		img: "/images/payload.png",
		stack: ["react", "typescript", "vite", "tailwindcss"],
		githubUrl: "https://github.com/Charlesss-0/payload",
		btnText: "View Project",
	},
	{
		id: "pixelsketch",
		name: "Pixel Sketch",
		tagline: "A pixel art editor that doesn't get in your way.",
		overview:
			"Pixel Sketch is an interactive drawing app for building pixel art on a grid you control, from tight 8x8 sprites up to 100x100 canvases. The goal was a tool that felt as immediate as a native app, with export options flexible enough to fit into any workflow, whether that's a game asset pipeline or a quick social post.",
		approach: [
			{
				step: "01",
				text: "Built the grid and drawing engine in React with TypeScript, keeping canvas state performant even at the largest 100x100 grid size.",
			},
			{
				step: "02",
				text: "Designed the UI in Figma first to nail the tool layout and interaction model before writing any component code.",
			},
			{
				step: "03",
				text: "Implemented multi-format export (PNG, JPEG, SVG) so artwork can drop straight into whatever the user is building next.",
			},
			{
				step: "04",
				text: "Styled entirely with Tailwind CSS on Next.js for a fast, responsive interface with no layout shift while drawing.",
			},
		],
		description:
			"Created an interactive pixel art drawing app with customizable grid sizes from 8 to 100, enabling users to design pixel-like artwork. The app supports exporting drawings in multiple formats, such as PNG, JPEG, and SVG, for versatile sharing and use.",
		img: "/images/pixelsketch.webp",
		stack: ["react", "typescript", "nextjs", "tailwindcss", "figma"],
		githubUrl: "https://github.com/Charlesss-0/pixels-sketch-v2",
		btnText: "View Project",
	},
	{
		id: "places-finder",
		name: "Places Finder",
		tagline: "Find what's around you, wherever you are.",
		overview:
			"Places Finder is a mobile app for discovering points of interest around the world, from restaurants and parks to museums and more. It uses real-time results and interactive maps to help users find places quickly. Since it was built for mobile, the focus was on keeping the client lightweight and responsive, with a fast, purpose-built API handling the data instead of relying on a heavy all-in-one SDK.",
		approach: [
			{
				step: "01",
				text: "Built the mobile client in React Native with Expo, keeping one codebase for iOS and Android.",
			},
			{
				step: "02",
				text: "Managed app-wide state (search, location, saved places) with Redux for predictable data flow across screens.",
			},
			{
				step: "03",
				text: "Built a Node.js/Express API layer to handle place lookups, keeping third-party keys and rate limits off the client.",
			},
			{
				step: "04",
				text: "Used Axios for typed, centralized API calls with consistent error handling across the app.",
			},
		],
		description:
			"A user-friendly mobile application designed to help users discover and explore points of interest in any location worldwide. Whether you're searching for restaurants, parks, museums, or any other type of establishment, this app provides real-time results with detailed information and interactive maps.",
		img: "/images/places-image.webp",
		stack: [
			"react",
			"typescript",
			"redux",
			"expo",
			"nodejs",
			"expressjs",
			"axios",
		],
		url: "https://places-apk.s3.us-east-2.amazonaws.com/Places.apk",
		githubUrl: "https://github.com/Charlesss-0/places",
		btnText: "Download App",
	},
];

export { projects };

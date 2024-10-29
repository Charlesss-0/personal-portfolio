const laptop = '/models/macbook-pro.glb'
const mobile = '/models/iphone-11.glb'

const projects = [
	{
		id: 'pixelsketch',
		name: 'Pixel Sketch',
		description:
			'Created an interactive pixel art drawing app with customizable grid sizes from 8 to 100, enabling users to design pixel-like artwork. The app supports exporting drawings in multiple formats, such as PNG, JPEG, and SVG, for versatile sharing and use.',
		img: '/images/pixelsketch.webp',
		stack: [
			'logos:react',
			'logos:typescript-icon',
			'devicon:nextjs',
			'devicon:tailwindcss',
			'logos:figma',
		],
		url: 'https://pixelsketch-blue.vercel.app',
		model: laptop,
		btnText: 'View Project',
	},
	{
		id: 'places-finder',
		name: 'Places Finder app',
		description:
			"A user-friendly mobile application designed to help users discover and explore points of interest in any location worldwide. Whether you're searching for restaurants, parks, museums, or any other type of establishment, this app provides real-time results with detailed information and interactive maps",
		img: '/images/places-image.webp',
		stack: [
			'logos:react',
			'logos:typescript-icon',
			'file-icons:redux',
			'file-icons:expo',
			'proicons:nodejs',
			'skill-icons:expressjs-light',
			'devicon-plain:axios-wordmark',
		],
		url: 'https://places-apk.s3.us-east-2.amazonaws.com/Places.apk',
		model: mobile,
		btnText: 'Download App',
	},
	{
		id: 'readify',
		name: 'Readify (ePub reader app)',
		description:
			'Developed an ePub reader app with user authentication, allowing users to upload, store, and read their favorite eBooks in the ePub format on any device',
		img: '/images/readify.webp',
		stack: [
			'logos:react',
			'logos:typescript-icon',
			'devicon:nextjs',
			'devicon:tailwindcss',
			'simple-icons:styledcomponents',
			'file-icons:redux',
			'logos:aws-s3',
			'devicon:firebase',
			'devicon:mongodb',
		],
		url: 'https://readify-one.vercel.app',
		model: laptop,
		btnText: 'View Project',
	},
	{
		id: 'weather-app',
		name: 'Weather App',
		description:
			'Created a weather application enabling users to check real-time weather updates in their current location or search for real-time weather in other areas',
		img: '/images/weather-app.webp',
		stack: ['logos:javascript', 'devicon:tailwindcss', 'devicon:webpack', 'devicon:babel'],
		url: 'https://weather505.netlify.app',
		model: laptop,
		btnText: 'View Project',
	},
]

export { projects }

const navLinks = [
	{
		id: 'contact',
		name: 'Contact',
	},
	{
		id: 'portfolio',
		name: 'Portfolio',
	},
	{
		id: 'hero',
		name: 'Hero',
	},
]

const portfolio = [
	{
		name: 'Readify (ePub reader app)',
		description:
			'Developed an ePub reader app with user authentication, allowing users to upload, store, and read their favorite eBooks in the ePub format on any device',
		img: '/assets/images/readify.webp',
		url: 'https://readify-one.vercel.app',
	},
	{
		name: 'Pixels Sketch',
		description: 'Designed and developed a pixel art creation app for a pixel drawing experience',
		img: '/assets/images/pixelssketch.webp',
		url: 'https://pixelssketch.netlify.app/',
	},
	{
		name: 'Weather App',
		description:
			'Created a weather application enabling users to check real-time weather updates in their current location or search for real-time weather in other areas',
		img: '/assets/images/weather-app.webp',
		url: 'https://weather505.netlify.app',
	},
]

const formInputElements = [
	{
		element: 'input',
		label: 'Full name',
		type: 'text',
		id: 'Fullname',
	},
	{
		element: 'input',
		label: 'Your email',
		type: 'email',
		id: 'Email',
	},
	{
		element: 'textarea',
		label: 'Message',
		type: 'text',
		id: 'Message',
	},
]

export { navLinks, portfolio, formInputElements }

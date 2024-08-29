const laptop = '/models/macbook-pro.glb'
const mobile = '/models/iphone-11.glb'

const portfolio = [
	{
		name: 'Places Finder app',
		description:
			"A user-friendly mobile application designed to help users discover and explore points of interest in any location worldwide. Whether you're searching for restaurants, parks, museums, or any other type of establishment, this app provides real-time results with detailed information and interactive maps",
		img: '/images/places-image.webp',
		url: 'https://places-apk.s3.us-east-2.amazonaws.com/Places.apk',
		model: mobile,
		btnText: 'Download App',
	},
	{
		name: 'Readify (ePub reader app)',
		description:
			'Developed an ePub reader app with user authentication, allowing users to upload, store, and read their favorite eBooks in the ePub format on any device',
		img: '/images/readify.webp',
		url: 'https://readify-one.vercel.app',
		model: laptop,
		btnText: 'View Project',
	},
	{
		name: 'Pixels Sketch',
		description: 'Designed and developed a pixel art creation app for a pixel drawing experience',
		img: '/images/pixelssketch.webp',
		url: 'https://pixelssketch.netlify.app/',
		model: laptop,
		btnText: 'View Project',
	},
	{
		name: 'Weather App',
		description:
			'Created a weather application enabling users to check real-time weather updates in their current location or search for real-time weather in other areas',
		img: '/images/weather-app.webp',
		url: 'https://weather505.netlify.app',
		model: laptop,
		btnText: 'View Project',
	},
]

export { portfolio }

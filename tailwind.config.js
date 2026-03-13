/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			muted: '#282828',
			bordered: '#3A3B3C',
			background: '#18191A',
			foreground: '#242526',
			primary: '#515A47',
			black: '#000000',
			gray: '#9F9F9F',
			white: '#F4F3F2',
			danger: '#DC3F41',
			success: '#4CAF50',
			warning: '#f48c06',
			transparent: colors.transparent
		}
	},
	plugins: []
}

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				serif: ['Bitter', 'serif'],
				sans_serif: ['Avenir Next', 'sans-serif']
			}
		}
	},

	plugins: []
};

module.exports = config;

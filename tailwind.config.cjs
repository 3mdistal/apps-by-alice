/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				serif: ['Bitter', 'serif']
			}
		}
	},

	plugins: []
};

module.exports = config;

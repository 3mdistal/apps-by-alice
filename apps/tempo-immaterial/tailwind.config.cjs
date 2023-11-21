/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				about: '#271647',
				studio: '#243269',
				commissions: '#642e1a',
				blog: '#d1dce7',
				connect: '#726a12',

				'about-bg': '#beb5ca',
				'studio-bg': '#d6ddf0',
				'commissions-bg': '#dcc9c6',
				'blog-bg': '#838391',
				'connect-bg': '#eeeded',

				'about-bg-hover': '#7f6e9c',
				'studio-bg-hover': '#99a6cc',
				'commissions-bg-hover': '#c9a4a3',
				'blog-bg-hover': '#67647a',
				'connect-bg-hover': '#d6c9c7'
			},
			fontFamily: {
				sans: ['Lato', 'Arial', 'sans-serif'],
				mono: ['Cutive Mono', 'mono'],
				logo: ['Euphoria Script', 'serif']
			},
			fontSize: {
				dynamicHeader: 'clamp(1.5rem, 3vw, 4rem)'
			},
			screens: {
				sm: '600px'
			}
		}
	},

	plugins: [
		function ({ addVariant }) {
			addVariant('children', '&>*');
			addVariant('children-not-hovered', '&>*:not(:hover)');
			addVariant('child-hovered', '&>*:has(:hover)');
		}
	]
};

module.exports = config;

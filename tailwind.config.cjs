const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'sans': ['Lato', 'Arial', 'sans-serif']
			},
			screens: {
				'sm': '600px'
			}
		}
	},

	plugins: [
		function ({ addVariant }) {
			addVariant('children', '&>*');
			addVariant('children-not-hovered', '&>*:not(:hover)')
			addVariant('child-hovered', '&>*:has(:hover)')
		}
	]
};

module.exports = config

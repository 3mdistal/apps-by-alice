const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		function ({ addVariant }) {
			addVariant('children', '&>*');
			addVariant('children-not-hovered', '&>* :not(:hover)')
			addVariant('child-hovered', '&>*:has(:hover)')
		}
	]
};

module.exports = config;

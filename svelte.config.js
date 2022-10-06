import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import prefix from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		postcss: {
			plugins: [prefix()]
		}
	}),
	kit: {
		adapter: adapter()
	},
};

export default config;

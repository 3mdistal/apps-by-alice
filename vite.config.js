import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

const config = {
	plugins: [sveltekit(), imagetools()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;

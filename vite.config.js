import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

const config = {
	plugins: [sveltekit(), imagetools()]
};

export default config;

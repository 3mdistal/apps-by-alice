import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

const config = {
	plugins: [imagetools(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		include: ['gsap', 'gsap/dist/ScrollTrigger']
	}
};

export default config;

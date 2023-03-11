import { getBlogs } from '$lib/notion/notion';
import { BYPASS_TOKEN } from '$env/static/private';

export async function load() {
	return {
		post: await getBlogs()
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

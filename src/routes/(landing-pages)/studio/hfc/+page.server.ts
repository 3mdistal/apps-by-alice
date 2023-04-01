import { getScraps, getSections } from '$lib/notion/notion';
import { BYPASS_TOKEN } from '$env/static/private';

export async function load() {
	return {
		props: {
			sections: await getSections(),
			poems: await getScraps()
		}
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

import { queryDatabase, publishedFilter, orderSort } from "$lib/notion";
import { REELS_DB, BYPASS_TOKEN } from "$env/static/private";

export async function load() {
	return {
		reels: await queryDatabase(REELS_DB, publishedFilter, orderSort)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};
import { queryDatabase, publishedFilter, orderSort, listChildren } from "$lib/notion";
import { REELS_DB, ABOUT_ID, BYPASS_TOKEN } from "$env/static/private";

export async function load() {
	return {
		reels: await queryDatabase(REELS_DB, publishedFilter, orderSort),
		aboutContent: await listChildren(ABOUT_ID)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};
import { queryDatabase, publishedFilter, orderSort, listChildren } from "$lib/notion";
import { REELS_DB, STUDIO_GALLERY_DB, ABOUT_ID, BYPASS_TOKEN, HIGH_QUALITY } from "$env/static/private";

export async function load() {
	return {
		reels: await queryDatabase(REELS_DB, publishedFilter, orderSort),
		studioGalleryContent: await queryDatabase(STUDIO_GALLERY_DB, publishedFilter, orderSort),
		aboutContent: await listChildren(ABOUT_ID),
		highQuality: HIGH_QUALITY === 'true' ? true : false
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};
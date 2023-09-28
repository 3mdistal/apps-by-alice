import { queryDatabase, publishedFilter, orderSort, listChildren, retrieveBlock } from "$lib/notion";
import { REELS_DB, STUDIO_GALLERY_DB, ABOUT_ID, BYPASS_TOKEN, HIGH_QUALITY } from "$env/static/private";

const videosFilter = {
	and: [
        {
            property: "Published",
            checkbox: {
                equals: true,
            },
        },
		{
			property: "Type",
			select: {
				equals: "vid"
			}
		}
    ],
};

export async function load() {
	return {
		reels: await queryDatabase(REELS_DB, publishedFilter, orderSort),
		videos: await queryDatabase(STUDIO_GALLERY_DB, videosFilter, orderSort),
		aboutHeading: await retrieveBlock(ABOUT_ID),
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
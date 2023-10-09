import {
	queryDatabase,
	publishedFilter,
	orderSort,
	listChildren,
	retrieveBlock
} from '$lib/notion';
import {
	REELS_DB,
	VIDS_AND_STILLS_DB,
	PROJECTS_DB,
	ABOUT_ID,
	ABOUT_DB,
	LOGOS_DB,
	BYPASS_TOKEN,
	HIGH_QUALITY
} from '$env/static/private';

const videosFilter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		},
		{
			property: 'Type',
			select: {
				equals: 'vid'
			}
		}
	]
};

const stillsFilter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		},
		{
			property: 'Type',
			select: {
				equals: 'still'
			}
		}
	]
};

export async function load() {
	return {
		reels: await queryDatabase(REELS_DB, publishedFilter, orderSort),
		videos: await queryDatabase(VIDS_AND_STILLS_DB, videosFilter, orderSort),
		stills: await queryDatabase(VIDS_AND_STILLS_DB, stillsFilter, orderSort),
		projects: await queryDatabase(PROJECTS_DB, publishedFilter),
		blurbHeading: await retrieveBlock(ABOUT_ID),
		blurbContent: await listChildren(ABOUT_ID),
		aboutContent: await queryDatabase(ABOUT_DB, publishedFilter, orderSort),
		logos: await queryDatabase(LOGOS_DB, publishedFilter, orderSort),
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

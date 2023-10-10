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
	BLURB_ID,
	ABOUT_ID,
	ABOUT_DB,
	LOGOS_DB,
	POSTERS_DB,
	CATEGORIES_DB,
	BYPASS_TOKEN,
	HIGH_QUALITY
} from '$env/static/private';
import type { ToggleBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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

export async function load({ route }) {
	const returnObject = {
		highQuality: HIGH_QUALITY === 'true' ? true : false
	};

	if (route.id === '/about') {
		return {
			aboutHeading: await retrieveBlock(ABOUT_ID).then((block) => {
				const { toggle } = block as ToggleBlockObjectResponse;
				return toggle.rich_text[0].plain_text;
			}),
			aboutIntro: await listChildren(ABOUT_ID),
			streamed: {
				aboutContent: await queryDatabase(ABOUT_DB, publishedFilter, orderSort),
				logos: await queryDatabase(LOGOS_DB, publishedFilter, orderSort)
			},
			...returnObject
		};
	}

	if (route.id === '/films') {
		return {
			posters: await queryDatabase(POSTERS_DB, publishedFilter, orderSort),
			categories: await queryDatabase(CATEGORIES_DB, publishedFilter, orderSort),
			...returnObject
		};
	}

	if (route.id === '/') {
		return {
			reels: await queryDatabase(REELS_DB, publishedFilter, orderSort),
			streamed: {
				blurbHeading: await retrieveBlock(BLURB_ID),
				blurbContent: await listChildren(BLURB_ID),
				videos: await queryDatabase(VIDS_AND_STILLS_DB, videosFilter, orderSort),
				projects: await queryDatabase(PROJECTS_DB, publishedFilter)
			},
			...returnObject
		};
	}

	return {
		projects: await queryDatabase(PROJECTS_DB, publishedFilter),
		stills: await queryDatabase(VIDS_AND_STILLS_DB, stillsFilter, orderSort),
		...returnObject
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

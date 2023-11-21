import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, POEMS_SECTIONS_DB, ALL_SCRAPS_DB } from '$env/static/private';
import type { Sort, Filter } from '$lib/notion/notion';

const sectionsFilter: Filter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	]
};

const sectionsSorts: Sort = [
	{
		direction: 'ascending',
		property: 'Sequence'
	}
];

const scrapsFilter: Filter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	]
};

const scrapsSorts: Sort = [
	{
		direction: 'ascending',
		property: 'Sequence'
	}
];

export async function load() {
	return {
		props: {
			sections: await queryDatabase(POEMS_SECTIONS_DB, sectionsFilter, sectionsSorts),
			poems: await queryDatabase(ALL_SCRAPS_DB, scrapsFilter, scrapsSorts)
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

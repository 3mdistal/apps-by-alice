import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, POEMS_SECTIONS_DB, ALL_SCRAPS_DB } from '$env/static/private';

const sectionsFilter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	]
};

const sectionsSorts = [
	{
		direction: 'ascending',
		property: 'Sequence'
	}
];

const scrapsFilter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	]
};

const scrapsSorts = [
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

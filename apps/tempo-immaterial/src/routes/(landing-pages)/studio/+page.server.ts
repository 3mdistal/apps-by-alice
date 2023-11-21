import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, STUDIO_DB } from '$env/static/private';
import type { Sort, Filter } from '$lib/notion/notion';

const studioFilter: Filter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	]
};

const studioSorts: Sort = [
	{
		direction: 'ascending',
		property: 'Order'
	}
];

export async function load() {
	return {
		cards: await queryDatabase(STUDIO_DB, studioFilter, studioSorts)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};
import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, ILLUSTRATIONS_DB } from '$env/static/private';
import type { Sort, Filter } from '$lib/notion/notion';

const illustrationFilter: Filter = {
	and: [
		{
			property: 'Published',
			checkbox: {
				equals: true
			}
		}
	]
};

const illustrationSorts: Sort = [
	{
		direction: 'ascending',
		property: 'Order'
	}
];

export async function load() {
	return {
		illustrations: await queryDatabase(ILLUSTRATIONS_DB, illustrationFilter, illustrationSorts)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};
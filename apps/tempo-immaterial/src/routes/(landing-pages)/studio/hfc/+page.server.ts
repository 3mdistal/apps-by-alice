import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, POEMS_SECTIONS_DB, ALL_SCRAPS_DB } from '$env/static/private';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const sectionsQueryParams: QueryDatabaseParameters = {
	database_id: POEMS_SECTIONS_DB,
	filter: {
		and: [
			{
				property: 'Published',
				checkbox: {
					equals: true
				}
			}
		]
	},
	sorts: [
		{
			direction: 'ascending',
			property: 'Sequence'
		}
	]
};

const scrapsQueryParams: QueryDatabaseParameters = {
	database_id: ALL_SCRAPS_DB,
	filter: {
		and: [
			{
				property: 'Published',
				checkbox: {
					equals: true
				}
			}
		]
	},
	sorts: [
		{
			direction: 'ascending',
			property: 'Sequence'
		}
	]
};

export async function load() {
	return {
		props: {
			sections: await queryDatabase(sectionsQueryParams),
			poems: await queryDatabase(scrapsQueryParams)
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

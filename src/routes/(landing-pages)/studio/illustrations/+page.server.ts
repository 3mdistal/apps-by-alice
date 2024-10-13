import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, ILLUSTRATIONS_DB } from '$env/static/private';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const queryParams: QueryDatabaseParameters = {
	database_id: ILLUSTRATIONS_DB,
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
			property: 'Order'
		}
	]
};

export async function load() {
	return {
		illustrations: await queryDatabase(queryParams)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

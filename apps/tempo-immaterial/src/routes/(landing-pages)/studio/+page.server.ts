import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, STUDIO_DB } from '$env/static/private';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const queryParameters: QueryDatabaseParameters = {
	database_id: STUDIO_DB,
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
		cards: await queryDatabase(queryParameters)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

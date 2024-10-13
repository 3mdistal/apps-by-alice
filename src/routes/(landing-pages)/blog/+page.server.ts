import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, BLOGS_DB } from '$env/static/private';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const today = new Date(Date.now()).toISOString();

const queryParams: QueryDatabaseParameters = {
	database_id: BLOGS_DB,
	filter: {
		and: [
			{
				property: 'Publication Date',
				date: {
					on_or_before: today
				}
			}
		]
	},
	sorts: [
		{
			direction: 'descending',
			property: 'Publication Date'
		}
	]
};

export async function load() {
	return {
		post: await queryDatabase(queryParams)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

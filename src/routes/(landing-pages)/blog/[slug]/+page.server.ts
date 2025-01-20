import { queryDatabase, listChildren } from '$lib/notion/notion';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { BYPASS_TOKEN, BLOGS_DB } from '$env/static/private';

export async function load({ params }) {
	async function fetchContent(slug: string) {
		const queryParams: QueryDatabaseParameters = {
			database_id: BLOGS_DB,
			filter: {
				and: [
					{
						property: 'Slug',
						url: {
							equals: slug
						}
					}
				]
			}
		};

		// Query blogs database for blog with matching slug.
		const queryResponse = await queryDatabase(queryParams);

		if (queryResponse.results.length === 0) {
			return { queryResponse: null, contentResponse: null };
		}

		// Get the content of the blog post.
		const contentResponse = await listChildren(queryResponse.results[0].id);

		return { queryResponse, contentResponse };
	}

	const result = await fetchContent(params['slug'] as string);
	return {
		post: result
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs20.x'
};

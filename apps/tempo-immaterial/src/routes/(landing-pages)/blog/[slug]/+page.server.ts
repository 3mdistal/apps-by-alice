import { queryDatabase, listChildren } from '$lib/notion/notion';
import type { Load } from '@sveltejs/kit';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { BYPASS_TOKEN, BLOGS_DB } from '$env/static/private';

export const load: Load = ({ params }) => {
	const fetchContent = async (slug: string) => {
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
		const res = [];

		// Query blogs database for blog with matching slug.
		const query = await queryDatabase(queryParams);
		res.push(query);

		// Get the content of the blog post.
		const content = await listChildren(query.results[0].id);
		res.push(content);

		return res;
	};

	return {
		post: fetchContent(params['slug'] as string)
	};
};

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, BLOGS_DB } from '$env/static/private';

const today = new Date(Date.now()).toISOString();

const blogsFilter = {
	and: [
		{
			property: 'Publication Date',
			date: {
				on_or_before: today
			}
		}
	]
};

const blogsSorts = [
	{
		direction: 'descending',
		property: 'Publication Date'
	}
];

export async function load() {
	return {
		post: await queryDatabase(BLOGS_DB, blogsFilter, blogsSorts)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

import { getContent, getRestOfContent } from '$lib/notion/notion';
import type { Load } from '@sveltejs/kit';
import { BYPASS_TOKEN } from '$env/static/private';

export const load: Load = ({ params }) => {
	const fetchContent = async (slug: string) => {
		const res = await getContent(slug);
		return res;
	};

	const fetchMoreContent = async (slug: string) => {
		const res1 = await getContent(slug);
		if (res1[1].next_cursor) {
			const res2 = await getRestOfContent(res1[0].results[0].id, res1[1].next_cursor);
			return res2;
		}
		return null;
	};

	return {
		post: fetchContent(params['slug'] as string),
		nested: {
			restOfContent: fetchMoreContent(params['slug'] as string)
		}
	};
};

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

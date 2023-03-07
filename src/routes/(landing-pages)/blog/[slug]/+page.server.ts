import { getContent } from '$lib/notion/notion';
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
	const fetchContent = async (slug: string) => {
		const res = await getContent(slug);
		return res;
	};

	return {
		post: fetchContent(params['slug'] as string)
	};
};

export const prerender = true;

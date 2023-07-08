import { retrieveBlock } from '$lib/notion/notion';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	const response = await retrieveBlock(id);
	return json(response);
};

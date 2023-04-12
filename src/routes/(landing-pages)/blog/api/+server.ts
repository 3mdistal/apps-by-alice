import { retrieveBlock } from '$lib/notion/notion';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { id, method } = await request.json();
	const response = await retrieveBlock(id, method);
	return json(response);
};

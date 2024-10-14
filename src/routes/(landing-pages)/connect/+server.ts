import { addSubscriber } from '$lib/notion/notion';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const email = String(formData.get('email'));

	const stream = await addSubscriber(email);

	return json(stream);
};

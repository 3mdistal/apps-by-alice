import { addCommission } from '$lib/notion/notion';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const name = String(formData.get('name'));
	const email = String(formData.get('email'));
	const description = String(formData.get('description'));

	const stream = await addCommission(name, email, description);

	return json(stream);
};

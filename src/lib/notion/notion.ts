import { Client } from '@notionhq/client';
import { NOTION_KEY, COMMISSIONS_DB, BLOGS_DB, USER_ID_ALICE } from '$env/static/private';

const notion = new Client({ auth: NOTION_KEY });

const today = new Date(Date.now()).toISOString();

export async function addCommission(name: string, email: string, description: string) {
	if (!NOTION_KEY || !COMMISSIONS_DB) {
		throw Error('Missing API keys from Notion.');
	}
	try {
		const response = await notion.pages.create({
			parent: { database_id: COMMISSIONS_DB },
			properties: {
				title: {
					title: [
						{
							text: {
								content: name
							}
						}
					]
				},
				Email: {
					email: email
				},
				Description: {
					rich_text: [
						{
							text: {
								content: description
							}
						}
					]
				},
				Notify: {
					people: [
						{
							id: USER_ID_ALICE
						}
					]
				}
			}
		});
		return response;
	} catch (error) {
		let errorMessage = 'Posting to commissions failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

export async function getBlogs(slug?: string) {
	try {
		const response = await notion.databases.query({
			database_id: BLOGS_DB,
			filter: {
				and: [
					{
						property: 'Publication Date',
						date: {
							on_or_before: today
						}
					},
					{
						property: 'Slug',
						url: {
							equals: slug ? slug : ''
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
		});
		return response;
	} catch (error) {
		let errorMessage = 'Retrieving blogs failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

export async function getContent(slug?: string) {
	try {
		let response = [];

		const query = await notion.databases.query({
			database_id: BLOGS_DB,
			filter: {
				and: [
					{
						property: 'Slug',
						url: {
							equals: slug ? slug : ''
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
		});

		response.push(query);

		let content;

		if (query.results[0]?.id) {
			content = await notion.blocks.children.list({
				block_id: query.results[0].id
			});
		}

		response.push(content);

		return response;
	} catch (error) {
		let errorMessage = 'Posting to commissions failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

export async function getRestOfContent(id: string, next_cursor: string) {
	try {
		const response = await notion.blocks.children.list({
			block_id: id,
			start_cursor: next_cursor
		});
		return response;
	} catch (error) {
		let errorMessage = 'Retrieving blogs failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

export async function retrieveBlock(id: string) {
	const content = await notion.blocks.retrieve({
		block_id: id
	});
	return content;
}

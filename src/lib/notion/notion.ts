import { Client } from '@notionhq/client';
import {
	NOTION_KEY,
	COMMISSIONS_DB,
	BLOGS_DB,
	POEMS_SECTIONS_DB,
	ALL_SCRAPS_DB,
	USER_ID_ALICE,
	SUBSCRIBERS_DB
} from '$env/static/private';
import type {
	PartialBlockObjectResponse,
	BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

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

export async function getSections() {
	try {
		const response = await notion.databases.query({
			database_id: POEMS_SECTIONS_DB,
			filter: {
				and: [
					{
						property: 'Published',
						checkbox: {
							equals: true
						}
					}
				]
			},
			sorts: [
				{
					direction: 'ascending',
					property: 'Sequence'
				}
			]
		});
		return response;
	} catch (error) {
		let errorMessage = 'Retrieving sections failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

export async function getScraps() {
	try {
		const response = await notion.databases.query({
			database_id: ALL_SCRAPS_DB,
			filter: {
				and: [
					{
						property: 'Published',
						checkbox: {
							equals: true
						}
					}
				]
			},
			sorts: [
				{
					direction: 'ascending',
					property: 'Sequence'
				}
			]
		});
		return response;
	} catch (error) {
		let errorMessage = 'Retrieving scraps failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

export async function getPoem(id: string) {
	try {
		const response = await notion.blocks.children.list({
			block_id: id
		});
		return response;
	} catch (error) {
		let errorMessage = 'Retrieving poem failed generically.';
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

export async function getBlogBySlug(slug?: string) {
	try {
		let response = [];

		// Fetch blog article by its slug
		const query = await notion.databases.query({
			database_id: BLOGS_DB,
			filter: {
				and: [
					{
						property: 'Slug',
						url: {
							equals: slug || ''
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

		async function listChildren(cursor?: string) {
			if (query.results[0]?.id) {
				const res = await notion.blocks.children.list({
					block_id: query.results[0].id,
					...(cursor && { start_cursor: cursor })
				});

				if (res?.has_more) {
					const moreRes = await listChildren(res.next_cursor as string);
					res.results.push(...(moreRes?.results || []));
				}

				return res;
			}
			return;
		}

		// Fetch the content of the original block using the ID
		async function fetchSyncedBlockContent(syncedBlockId: string) {
			const originalBlock = await notion.blocks.children.list({
				block_id: syncedBlockId
			});

			return originalBlock;
		}

		const content = await listChildren();

		function isBlockObjectResponse(
			block: PartialBlockObjectResponse | BlockObjectResponse | undefined
		): block is BlockObjectResponse {
			return (block as BlockObjectResponse).type !== undefined;
		}

		// Replace synced blocks with their content
		if (content) {
			for (let i = 0; i < content.results.length; i++) {
				const block = content.results[i];

				if (
					isBlockObjectResponse(block) &&
					block.type === 'synced_block' &&
					block.synced_block.synced_from !== null
				) {
					const originalBlockContent = await fetchSyncedBlockContent(
						block.synced_block.synced_from.block_id
					);
					content.results.splice(i, 1, ...originalBlockContent.results);
				}
			}
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

// export async function getRestOfContent(id: string, next_cursor: string) {
// 	try {
// 		const response = await notion.blocks.children.list({
// 			block_id: id,
// 			start_cursor: next_cursor
// 		});
// 		return response;
// 	} catch (error) {
// 		let errorMessage = 'Retrieving blogs failed generically.';
// 		if (error instanceof Error) {
// 			errorMessage = error.message;
// 		}
// 		return errorMessage;
// 	}
// }

export async function retrieveBlock(id: string, method: string) {
	if (method === 'children') {
		const content = await notion.blocks.children.list({
			block_id: id
		});
		return content;
	}
	const content = await notion.blocks.retrieve({
		block_id: id
	});
	return content;
}

export async function addSubscriber(email: string) {
	try {
		const response = await notion.pages.create({
			parent: {
				database_id: SUBSCRIBERS_DB
			},
			properties: {
				Email: {
					email: email
				}
			}
		});
		return response;
	} catch (error) {
		let errorMessage = 'Adding email failed generically.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return errorMessage;
	}
}

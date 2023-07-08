import { Client } from '@notionhq/client';
import { NOTION_KEY, COMMISSIONS_DB, USER_ID_ALICE, SUBSCRIBERS_DB } from '$env/static/private';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: NOTION_KEY });

function throwIfMissing() {
	if (!NOTION_KEY) {
		throw Error('Missing API key from Notion.');
	}
}

export type Sort = Array<{
	property: string;
	direction: 'ascending' | 'descending';
}>;

export type Filter = {
	and: Array<{
		property: string;
		checkbox: {
			equals: boolean;
		};
	}>;
};

// For listing all the children of a database. It can also be used to filter and sort.
export async function queryDatabase(id: string, filter: Filter, sorts: Sort) {
	throwIfMissing();
	const response = await notion.databases.query({
		database_id: id,
		filter: filter,
		sorts: sorts
	});
	return response;
}

// For listing all the children of a block. Generally, this is then passed to the renderer.
export async function listChildren(id: string, cursor?: string) {
	throwIfMissing();

	const response = await notion.blocks.children.list({
		block_id: id,
		...(cursor && { start_cursor: cursor })
	});

	// If there are more children, recursively call this function again.
	if (response?.has_more) {
		const moreResponse = await listChildren(id, response.next_cursor as string);
		response.results.push(...(moreResponse?.results || []));
	}

	// Replace synced blocks with static content.
	if (response.results) {
		for (let i = 0; i < response.results.length; i++) {
			const block = response.results[i] as BlockObjectResponse;

			if (block && block.type === 'synced_block' && block.synced_block.synced_from !== null) {
				const originalBlockContent = await listChildren(block.synced_block.synced_from.block_id);
				response.results.splice(i, 1, ...originalBlockContent.results);
			}
		}
	}
	return response;
}

// For refreshing images.
export async function retrieveBlock(id: string) {
	throwIfMissing();
	const content = await notion.blocks.retrieve({
		block_id: id
	});
	return content;
}

// Unique to commissions, needs refactored to generic create page.
export async function addCommission(name: string, email: string, description: string) {
	throwIfMissing();
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
}

// Unique to subscribers, needs refactored to generic create page.
export async function addSubscriber(email: string) {
	throwIfMissing();
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
}

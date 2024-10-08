import { NOTION_KEY } from "$env/static/private";
import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: NOTION_KEY });

function throwIfMissing() {
  if (!NOTION_KEY) {
    throw Error("Missing API key from Notion.");
  }
}

export const publishedFilter = {
  and: [
    {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  ],
};

export const orderSort = [
  {
    direction: "ascending",
    property: "Order",
  },
];

// For listing all the children of a database. It can also be used to filter and sort.
export async function queryDatabase(
  id: string,
  filter: QueryDatabaseParameters["filter"],
  sorts?: QueryDatabaseParameters["sorts"]
) {
  throwIfMissing();
  const response = await notion.databases.query({
    database_id: id,
    filter: filter,
    sorts: sorts,
  });
  return response;
}

// For retrieving a single block's content.
export async function retrieveBlock(id: string) {
  throwIfMissing();
  const response = await notion.blocks.retrieve({
    block_id: id,
  });
  return response;
}

// This function fetches children of a block with optional pagination
async function fetchChildren(id: string, cursor: string | null = null) {
  const response = await notion.blocks.children.list({
    block_id: id,
    ...(cursor && { start_cursor: cursor }),
  });
  return response;
}

// This function replaces synced blocks with their original content
async function replaceSyncedBlocks(results: BlockObjectResponse[]) {
  for (let i = 0; i < results.length; i++) {
    const block = results[i];
    if (
      block &&
      block.type === "synced_block" &&
      block.synced_block.synced_from !== null
    ) {
      const originalBlockContent = await fetchChildren(
        block.synced_block.synced_from.block_id
      );
      results.splice(
        i,
        1,
        ...(originalBlockContent.results as BlockObjectResponse[])
      );
    }
  }
  return results;
}

// The main function
export async function listChildren(id: string) {
  let cursor: string | null = null;
  let allResults: BlockObjectResponse[] = [];

  do {
    const response = await fetchChildren(id, cursor);
    allResults = [
      ...allResults,
      ...(response.results as BlockObjectResponse[]),
    ];
    cursor = response.has_more ? response.next_cursor : null;
  } while (cursor);

  const finalResults = await replaceSyncedBlocks(allResults);
  return { results: finalResults };
}

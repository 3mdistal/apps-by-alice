import { Client } from "@notionhq/client";
import {
  NOTION_KEY,
  COMMISSIONS_DB,
  BLOGS_DB,
  USER_ID_ALICE,
} from "$env/static/private";

const notion = new Client({ auth: NOTION_KEY });

const commissionsDatabaseID = COMMISSIONS_DB;
const blogsDatabaseID = BLOGS_DB;

const today = new Date(Date.now()).toISOString();

export async function addCommission(
  name: string,
  email: string,
  description: string
) {
  if (!NOTION_KEY || !COMMISSIONS_DB) {
    throw Error("Missing API keys from Notion.");
  }
  try {
    const response = await notion.pages.create({
      parent: { database_id: commissionsDatabaseID },
      properties: {
        title: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Description: {
          rich_text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
        Notify: {
          people: [
            {
              id: USER_ID_ALICE,
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    let errorMessage = "Posting to commissions failed generically.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

export async function getBlogs(slug?: string) {
  try {
    const response = await notion.databases.query({
      database_id: blogsDatabaseID,
      filter: {
        and: [
          {
            property: "Publication Date",
            date: {
              on_or_before: today,
            },
          },
          {
            property: "Slug",
            url: {
              equals: slug ? slug : "",
            },
          },
        ],
      },
      sorts: [
        {
          direction: "descending",
          property: "Publication Date",
        },
      ],
    });
    console.log(response);
    console.log(response.results[0].id);
    return response;
  } catch (error) {
    let errorMessage = "Posting to commissions failed generically.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

export async function getContent(slug?: string) {
  try {
    const query = await notion.databases.query({
      database_id: blogsDatabaseID,
      filter: {
        and: [
          {
            property: "Publication Date",
            date: {
              on_or_before: today,
            },
          },
          {
            property: "Slug",
            url: {
              equals: slug ? slug : "",
            },
          },
        ],
      },
      sorts: [
        {
          direction: "descending",
          property: "Publication Date",
        },
      ],
    });

    const content = await notion.blocks.children.list({
      block_id: query.results[0].id,
    });
    console.log(content);
    return content;
  } catch (error) {
    let errorMessage = "Posting to commissions failed generically.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

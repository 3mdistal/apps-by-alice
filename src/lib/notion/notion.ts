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

export async function getBlogs() {
  try {
    const response = await notion.databases.query({
      database_id: blogsDatabaseID,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
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
    return response;
  } catch (error) {
    let errorMessage = "Posting to commissions failed generically.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

// export async function addSubscriber(name, email) {
//     try {
//         const response = await notion.pages.create({
//             parent: {database_id: subscriberDatabaseID },
//             properties: {
//                 title: {
//                     title: [
//                         {
//                             "text": {
//                                 "content": name
//                             }
//                         }
//                     ]
//                 },
//                 Email: {
//                     email: email
//                 }
//             }
//         })
//     } catch (error) {
//         console.error(error.body)
//     }
// }

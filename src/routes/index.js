import { Client } from "@notionhq/client";

export async function GET() { 

    const notion = new Client({
        auth: process.env.NOTION_KEY,
    });

    const databaseID = process.env.NOTION_DATABASE_ID;

    async function getDatabaseChildren(name) {
        const response = await notion.databases.query({
            database_id: databaseID,
            filter: {
                and: [
                    {
                        property: "Name",
                        rich_text: {
                            contains: name,
                        },
                    },
                ],
            },
        });
        // console.log(response);
        return response.results[0]["id"];
    }

    async function getPageContents(pageID) {
        const response = await notion.blocks.children.list({
            block_id: pageID,
        });
        let arr = response.results;
        let newArr = [];
        for (let elem of arr) {
            let richTextArr = elem.paragraph.rich_text;
            if (richTextArr.length === 0) {
                break;
            }
            newArr.push(richTextArr[0].text.content);
        }
        return newArr;
    }

    async function findName(name) {
        const res = await getDatabaseChildren(name).then(getPageContents);
        return res;
    }

    return {
        status: 200,
        body: { message: await findName("testing") },
    }
}

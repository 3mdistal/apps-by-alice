import { Client } from "@notionhq/client";

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
    let {
        results: [
            {
                id
            }
        ]
    } = response
    return id
}

async function getPageContents(pageID) {
    const response = await notion.blocks.children.list({
        block_id: pageID,
    });
    const { results } = response
    let arr = []
    results.forEach((result) => {
        const { paragraph: { rich_text } } = result
        if (rich_text.length !== 0) {
            let tempArr = []
            rich_text.forEach(
                rich => tempArr.push(rich.text.content)
            )
            arr.push(tempArr.join(""))
        }
    })
    return arr
}

export async function findName(name) {
    const res = await getDatabaseChildren(name).then(getPageContents);
    return res;
}
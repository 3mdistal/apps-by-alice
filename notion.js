require('dotenv').config()
const { Client } = require("@notionhq/client")
const { appendBlockChildren } = require('@notionhq/client/build/src/api-endpoints')
// const { text } = require('body-parser')

const notion = new Client({
    auth: process.env.NOTION_KEY,
})

const databaseID = process.env.NOTION_DATABASE_ID


// async function getDatabase() {
//     const response = await notion.databases.retrieve({
//         database_id: databaseID,
//     })
//     console.log(response);
// }

// getDatabase();

async function getDatabaseChildren(name) {
    const response = await notion.databases.query({
        database_id: databaseID,
        filter: {
            and: [
                {
                    property: 'Name',
                    "rich_text": {
                        contains: name
                    }
                }
            ]
        }
    })
    // console.log(response)
    return response.results[0]["id"]
}

async function getPageContents(pageID) {
    const response = await notion.blocks.children.list(
        {
            block_id: pageID
        }
    )
    let arr = response.results
    let newArr = []
    for (let elem of arr) {
        newArr.push(elem.paragraph.rich_text[0].text.content)
    }
    return newArr
}

async function findName(name) {
    const res = await getDatabaseChildren(name).then(getPageContents)
    return res
}

// findName("dehiscence")
// findName("dimensions zero to five")
// findName("testing")

// async function addItem(text) {
//     try {
//         const response = await notion.pages.create({
//             parent: {
//                 database_id: databaseID
//             },
//             properties: {
//                 title: {
//                     title: [
//                         {
//                             text: {
//                                 "content": text
//                             }
//                         }
//                     ]
//                 }
//             }
//         })
//         console.log(respone)
//         console.log("Success! Entry added.")
//     } catch (error) {
//         console.log(error.body)
//     }
// }

// addItem("Shorouk & Alice got a house!!!!!!")

module.exports = { findName }
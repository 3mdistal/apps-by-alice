require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_KEY,
})

notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID })

const databaseID = process.env.NOTION_DATABASE_ID

async function getDatabase() {
    const response = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID,
    })
    console.log(response);
}

getDatabase();

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
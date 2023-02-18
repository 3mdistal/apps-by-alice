import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

const commissionsDatabaseID = process.env.COMMISSIONS_DB
const subscriberDatabaseID = process.env.SUBSCRIBERS_DB

export async function addCommission(name, email, description) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: commissionsDatabaseID },
            properties: {
                title: {
                    title: [
                        {
                            "text": {
                                "content": name
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
                            "text": {
                                "content": description
                            }
                        }
                    ]
                }
            }
        })
        console.log(response)
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}

export async function addSubscriber(name, email) {
    try {
        const response = await notion.pages.create({
            parent: {database_id: subscriberDatabaseID },
            properties: {
                title: {
                    title: [
                        {
                            "text": {
                                "content": name
                            }
                        }
                    ]
                },
                Email: {
                    email: email
                }
            }
        })
    } catch (error) {
        console.error(error.body)
    }
}
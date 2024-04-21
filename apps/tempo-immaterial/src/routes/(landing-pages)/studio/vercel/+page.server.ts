import { queryDatabase } from '$lib/notion/notion';
import { BYPASS_TOKEN, PROFESSIONAL_DB } from '$env/static/private';
import type { QueryDatabaseParameters, TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

const queryParams: QueryDatabaseParameters = {
	database_id: PROFESSIONAL_DB,
	sorts: [
		{
			direction: 'descending',
			property: 'Date'
		}
	]
};

export async function load() {
	return {
		publicationList: await queryDatabase(queryParams)
	};
}

export const config = {
	isr: {
		expiration: false,
		bypassToken: BYPASS_TOKEN
	},
	runtime: 'nodejs18.x'
};

export type ProfessionalPublications = {
    id: string;
    properties: {
        Name: {
            type: 'title';
            title: [
                {
                    plain_text: string;
                }
            ];
        },
        Date: {
            type: 'date';
            date: {
                start: string;
            };
        },
        Type: {
            type: 'select';
            select: {
                name: string;
            };
        },
        Link: {
            type: 'url';
            url: string;
        },
        Description: {
            type: 'rich_text';
            rich_text: TextRichTextItemResponse[];
        }
    }
}
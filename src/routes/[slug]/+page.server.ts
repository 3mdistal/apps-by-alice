import type { Load } from "@sveltejs/kit";
import { replaceSpaces } from "$lib/helpers";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";


export const load: Load = ({params, parent}) => {  
    const matchParent = async () => {
        const possibleParentProjects = await parent();

        const slug = params['slug'];
        let parentProject: PageObjectResponse;

        possibleParentProjects.projects.results.forEach(result => {
            if (replaceSpaces(result.properties.Name.title[0].plain_text, false) === slug) {
                parentProject = result
            }
        });

        const stills: Array<PageObjectResponse> = [];

        possibleParentProjects.stills.results.forEach(result => {
            if (result.properties.Project.relation[0].id === parentProject.id) {
                stills.push(result);
            }
        });

        return { parentProject, stills };
    }

    return {
        parent: matchParent()
    }


}
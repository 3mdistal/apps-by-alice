import type { Load } from '@sveltejs/kit';
import { replaceSpaces } from '$lib/helpers';
import type {
	BlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { listChildren } from '$lib/notion';

export const load: Load = ({ params, parent }) => {
	const matchParent = async () => {
		const possibleParentProjects = await parent();

		const slug = params['slug'];
		let parentProject: PageObjectResponse;

		possibleParentProjects.projects.results.forEach((result) => {
			if (replaceSpaces(result.properties.Name.title[0].plain_text, false) === slug) {
				parentProject = result;
			}
		});

		const stills: Array<PageObjectResponse> = [];

		possibleParentProjects.stills.results.forEach((result) => {
			if (result.properties.Project.relation[0].id === parentProject.id) {
				stills.push(result);
			}
		});

		const info = await listChildren(parentProject.id);

		let poster;

		possibleParentProjects.posters.results.forEach((result) => {
			if (result.properties.Project.relation.length === 0) return;
			if (result.properties.Project.relation[0].id === parentProject.id) {
				poster = result.properties.Name.title[0].plain_text;
			}
		});

		return { parentProject, stills, info, poster };
	};

	return {
		parent: matchParent()
	};
};

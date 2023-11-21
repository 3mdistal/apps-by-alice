import { DEV_MODE } from '$env/static/private';

export async function load() {
	return {
		devMode: DEV_MODE === 'true' ? true : false
	};
}

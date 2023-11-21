import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { readable, writable, type Writable } from 'svelte/store';

export const state = writable('home');

export const names = readable(['about', 'studio', 'commissions', 'blog', 'connect']);

export const accentColors = readable({
	about: '#271647',
	studio: '#243269',
	commissions: '#642e1a',
	blog: '#d1dce7',
	connect: '#726a12'
});

export const backgroundColors = readable({
	home: '#fafafa',
	about: '#beb5ca',
	studio: '#d6ddf0',
	commissions: '#dcc9c6',
	blog: '#838391',
	connect: '#eeeded'
});

export const currentBlog: Writable<Array<BlockObjectResponse>> = writable();

export const analyticsCookie: Writable<boolean> = writable(false);

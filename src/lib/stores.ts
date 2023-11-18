import { writable, type Writable } from 'svelte/store';

export const dark = writable('392E22');
export const mid_dark = writable('65361F');
export const mid = writable('D2945F');
export const mid_light = writable('DEB192');
export const light = writable('ECD7C0');

export const menuOpen = writable(false);
export const homepageOpen = writable(true);

export const currentScrollContainer: Writable<HTMLElement | Window | null> = writable(null);

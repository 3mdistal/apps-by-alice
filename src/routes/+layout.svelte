<script lang="ts">
	import '../app.scss';
	import Logo from '../cms/images/logo/logo.png';
	import Svgs from '../lib/icons/svgs.svelte';
	import { webVitals } from '$lib/partials/vitals';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}

	// Vercel Analytics
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<meta charset="utf-8" />
	<link rel="icon" type="image" href={Logo} />
	<meta name="viewport" content="width=device-width" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap" rel="stylesheet" />
	<link
		href="https://fonts.googleapis.com/css2?family=Euphoria+Script&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Svgs />

<slot />

<script lang="ts">
	import HomepageWrapper from '../lib/homepage/homepage-wrapper.svelte';
	import SiteTitle from '../lib/homepage/site-title.svelte';
	import Svgs from '$lib/icons/svgs.svelte';
	import { state } from '../lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		state.set('home');
		document.body.style.backgroundColor = '#fafafa';
	});
</script>

<svelte:head>
	<title>Tempo Immaterial</title>
	<meta
		name="description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, commissions and more."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Tempo Immaterial" />
	<meta
		property="og:description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, commissions and more."
	/>
	<meta property="og:image" content="https://ik.imagekit.io/tempoimmaterial/ogimage.webp" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com" />
	<meta name="twitter:url" content="https://www.alicealexandra.com" />
	<meta name="twitter:title" content="Tempo Immaterial" />
	<meta
		name="twitter:description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, collabs, and more."
	/>
	<meta name="twitter:image" content="https://ik.imagekit.io/tempoimmaterial/ogimage.webp" />
	<meta name="twitter:image:alt" content="The homepage of alicealexandra.com." />
</svelte:head>

<div class="relative h-[100dvh] flex-col overflow-hidden pt-4 md:pt-[6vh]">
	<SiteTitle />
	<HomepageWrapper />
</div>
<div class="hidden"><a rel="me" href="https://hachyderm.io/@tempoimmaterial">Mastodon</a></div>

<Svgs />

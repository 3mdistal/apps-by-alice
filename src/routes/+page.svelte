<script lang="ts">
	import HomepageWrapper from '../lib/homepage/homepage-wrapper.svelte';
	import SiteTitle from '../lib/homepage/site-title.svelte';
	import { state } from '../lib/stores';
	import { onMount } from 'svelte';
	import Piano from '$images/studio/piano-with-chair.webp';

	onMount(() => {
		state.set('home');
		document.body.style.backgroundColor = '#fafafa';
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={Piano} />
</svelte:head>

<div class="relative h-[100dvh] flex-col overflow-hidden pt-4 md:pt-[6vh]">
	<SiteTitle />
	<HomepageWrapper />
</div>

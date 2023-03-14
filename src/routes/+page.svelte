<script lang="ts">
	import HomepageWrapper from '../lib/homepage/homepage-wrapper.svelte';
	import SiteTitle from '../lib/homepage/site-title.svelte';
	import { state } from '../lib/stores';
	import { onMount } from 'svelte';
	import Flowers from '$images/about/flowers-in-hand.webp';
	import Piano from '$images/studio/piano-with-chair.webp';
	import Rabbit from '$images/commissions/rabbit-in-hat.webp';
	import Bird from '$images/blog/bird.webp';

	onMount(() => {
		state.set('home');
		document.body.style.backgroundColor = '#fafafa';
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={Flowers} />
	<link rel="preload" as="image" href={Piano} />
	<link rel="preload" as="image" href={Rabbit} />
	<link rel="preload" as="image" href={Bird} />
</svelte:head>

<div class="relative h-[100dvh] flex-col overflow-hidden pt-4 md:pt-[6vh]">
	<SiteTitle />
	<HomepageWrapper />
</div>

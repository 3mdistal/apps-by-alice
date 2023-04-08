<script lang="ts">
	import HomepageWrapper from '../lib/homepage/homepage-wrapper.svelte';
	import SiteTitle from '../lib/homepage/site-title.svelte';
	import { state } from '../lib/stores';
	import { onMount } from 'svelte';
	import Flowers from '$images/about/flowers-in-hand.webp';
	import Piano from '$images/studio/piano-with-chair.webp';
	import Rabbit from '$images/commissions/rabbit-in-hat.webp';
	import Bird from '$images/blog/bird.webp';

	function preloadImages(...imageUrls: string[]) {
		imageUrls.forEach((url) => {
			const img = new Image();
			img.src = url;
		});
	}

	onMount(() => {
		state.set('home');
		document.body.style.backgroundColor = '#fafafa';
		preloadImages(Flowers, Piano, Rabbit, Bird);
	});
</script>

<svelte:head>
	<meta
		name="description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, commissions and more."
	/>
	<title>Tempo Immaterial</title>
</svelte:head>

<div class="relative h-[100dvh] flex-col overflow-hidden pt-4 md:pt-[6vh]">
	<SiteTitle />
	<HomepageWrapper />
</div>

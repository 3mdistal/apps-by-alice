<script lang="ts">
	import { onMount } from 'svelte';
	import StudioCard from './studio-card.svelte';
	import gsap from 'gsap';

	export let data;

	const {
		cards: { results: cards }
	} = data;

	function populate() {
		const tl = gsap.timeline();
		tl.fromTo(
			'img.fixed',
			{ opacity: 0 },
			{ duration: 1, opacity: 0.4, ease: 'power2.inOut' }
		).fromTo('.card-div > *', { opacity: 0 }, { opacity: 1, stagger: 0.1 }, '< .5');
	}

	onMount(() => {
		populate();
		fetch('/studio', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});
</script>

<svelte:head>
	<title>Studio</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com/studio" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Studio" />
	<meta
		property="og:description"
		content="The studio works of Alice Alexandra Moore. Enjoy fiction, film, fantasy, poetry, illustrations, music, essays, websites, and more."
	/>
	<meta
		property="og:image"
		content="https://ik.imagekit.io/tempoimmaterial/studio/studioog?tr=w-750"
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com/studio" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/studio" />
	<meta name="twitter:title" content="Studio" />
	<meta
		name="twitter:description"
		content="The studio works of Alice Alexandra Moore. Enjoy fiction, film, fantasy, poetry, illustrations, music, essays, websites, and more."
	/>
	<meta
		name="twitter:image"
		content="https://ik.imagekit.io/tempoimmaterial/studio/studioog?tr=w-750"
	/>
	<meta name="twitter:image:alt" content="The studio page of alicealexandra.com." />
</svelte:head>

<div class="min-h-[100lvh] bg-studio-bg">
	<img
		src="https://ik.imagekit.io/tempoimmaterial/studio/ink.png?updatedAt=1694604654601"
		alt=""
		class="fixed h-full opacity-40"
	/>

	<!-- Break -->
	<div class="h-12" />

	<!-- Cards -->
	<div class="card-div flex flex-wrap items-start justify-center gap-12 sm:justify-center sm:px-10">
		{#each cards as { properties: { Title: { title: [{ plain_text: title }] }, Subtitle: subtitle, 'Shortened Logo Text': logo, Image: { url: src }, ImageAlt: { rich_text: [{ text: { content: alt } }] }, Description: description, ButtonText: { rich_text: [{ text: { content: buttonText } }] }, Destination: { url } } }}
			<StudioCard {title} {subtitle} {logo} {src} {alt} {description} {buttonText} {url} />
		{/each}
	</div>

	<div class="h-12" />
</div>

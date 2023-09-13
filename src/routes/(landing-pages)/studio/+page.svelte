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
	});
</script>

<svelte:head>
	<title>Studio</title>
	<meta
		name="description"
		content="The studio works of Alice Alexandra Moore. Enjoy fiction, fantasy, poetry, illustrations, music, essays, and more."
	/>
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

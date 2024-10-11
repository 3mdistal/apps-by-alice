<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import StudioCard from './studio-card.svelte';
	import gsap from 'gsap';
	import { backgroundColors, state } from '$lib/stores';

	export let data;

	const {
		cards: { results: cards }
	} = data;

	function populate() {
		document.body.style.backgroundColor = $backgroundColors.studio;
		const tl = gsap.timeline();
		tl.to('.card-div', { opacity: 1, duration: 0.5 })
			.to('img.fixed', { duration: 0.4, opacity: 1, ease: 'power2.inOut' }, '<')
			.to('img.fixed', { duration: 0.8, opacity: 0.4, ease: 'power2.inOut' })
			.fromTo('.card-div > *', { opacity: 0 }, { opacity: 1, stagger: 0.1 }, '< .5');

		return tl;
	}

	onMount(() => {
		fetch('/studio', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});

	onDestroy(() => {
		state.set('home');
	});
</script>

<svelte:head>
	<title>Studio</title>
	<meta
		property="description"
		content="The studio works of Alice Alexandra Moore. Enjoy fiction, film, fantasy, poetry, illustrations, music, essays, websites, and more."
	/>
	<meta
		property="keywords"
		content="alice, alexandra, moore, alice alexandra moore, alice moore, alexandra moore, studio, fiction, film, fantasy, poetry, illustrations, music, essays, websites"
	/>

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

<div class="min-h-[100lvh] bg-studio-bg" use:populate>
	<h1 class="absolute scale-0 opacity-0">studio</h1>

	<img
		src="https://ik.imagekit.io/tempoimmaterial/studio/ink.png?updatedAt=1694604654601"
		alt=""
		class="fixed h-full min-h-[100lvh] opacity-0"
	/>

	<!-- Break -->
	<div class="h-12" />

	<!-- Cards -->
	<div
		class="card-div flex flex-wrap items-start justify-center gap-12 opacity-0 sm:justify-center sm:px-10"
	>
		{#each cards as card}
			<StudioCard {card} />
		{/each}
	</div>

	<!-- Break -->
	<div class="h-12" />
</div>

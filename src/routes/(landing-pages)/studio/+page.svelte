<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import StudioCard from './studio-card.svelte';
	import gsap from 'gsap';
	import { backgroundColors, state } from '$lib/stores';
	import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

	export let data;

	const cards = data.cards.results.filter((card): card is PageObjectResponse => {
		return 'parent' in card && 'properties' in card && 'icon' in card && 'cover' in card;
	});

	function populate(node: HTMLElement) {
		document.body.style.backgroundColor = $backgroundColors.studio;
		const tl = gsap.timeline();
		tl.to('.card-div', { opacity: 1, duration: 0.5 })
			.fromTo(
				'.studio-background',
				{ opacity: 0 },
				{ opacity: 1, duration: 0.4, ease: 'power2.inOut' }
			)
			.to('.studio-background', { opacity: 0.4, duration: 0.8, ease: 'power2.inOut' })
			.fromTo('.card-div > *', { opacity: 0 }, { opacity: 1, stagger: 0.1 }, '<');

		return {
			destroy() {
				tl.kill();
			}
		};
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

<div class="studio-container" use:populate>
	<h1 class="studio-title">studio</h1>

	<img
		src="https://ik.imagekit.io/tempoimmaterial/studio/ink.png?updatedAt=1694604654601"
		alt=""
		class="studio-background"
	/>

	<div class="break"></div>

	<div class="card-div">
		{#each cards as card}
			<StudioCard {card} />
		{/each}
	</div>

	<div class="break"></div>
</div>

<style>
	.studio-container {
		position: relative;
		background-color: var(--studio-bg);
		min-height: 100lvh;
		overflow: hidden;
	}

	.studio-title {
		position: absolute;
		scale: 0;
		opacity: 0;
	}

	.studio-background {
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 0;
		width: 100%;
		height: 100vh;
		object-fit: cover;
		pointer-events: none;
	}

	.break {
		height: 3rem;
	}

	.card-div {
		display: flex;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 3rem;
		opacity: 0;
		z-index: 1;
	}

	@media (min-width: 640px) {
		.card-div {
			justify-content: center;
			padding-right: 2.5rem;
			padding-left: 2.5rem;
		}
	}
</style>

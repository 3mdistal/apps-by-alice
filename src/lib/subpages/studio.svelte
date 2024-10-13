<script lang="ts">
	import CarouselLi from '$lib/subpages/studio/carousel-li.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { loadScrollTrigger } from '$lib/partials/load-scroll-trigger';

	import BirdTMI from '../../cms/images/studio/bird-tmi.jpg';
	import FlowerP from '../../cms/images/studio/flower-p.jpg';
	import MirrorB from '../../cms/images/studio/mirror-b.jpg';
	import PianoHFC from '../../cms/images/studio/piano-hfc.jpg';
	import CityJ from '../../cms/images/studio/city-j.jpg';
	import SnakesI from '../../cms/images/studio/snakes-i.jpg';

	export let accent: string;
	export let background: string;

	let container: HTMLDivElement;
	let carousel: HTMLUListElement;

	function scrollAnimate(scrollTriggerInstance) {
		gsap.registerPlugin(scrollTriggerInstance);
		if (window.innerWidth > 768) {
			gsap.to(carousel, {
				x: '-100vw',
				scrollTrigger: {
					trigger: container,
					scrub: 0.5,
					start: 'top top',
					end: 'bottom bottom'
				}
			});
		}
	}

	let scrollTriggerInstance;

	onMount(async () => {
		scrollTriggerInstance = await loadScrollTrigger();
		scrollAnimate(scrollTriggerInstance);
	});
</script>

<div class="spacer"></div>

<div class="container" bind:this={container}>
	<div style="background-color:{accent}">
		<p style="color:{background}">Works</p>

		<ul bind:this={carousel} class="carousel" style="background-color:{background}">
			<CarouselLi
				src={PianoHFC}
				alt="A relatively destroyed grand piano in front of the ruins of a building."
				title="Hymns for Calliope"
				subtitle="Poems"
				href="/studio/hfc"
			/>
			<CarouselLi
				src={BirdTMI}
				alt="Watercolor bird, confident and flying."
				title="These Makeshift Idiotika"
				subtitle="A shifting, tilting world."
				href="studio/tmi"
				comingSoon
			/>
			<CarouselLi
				src={MirrorB}
				alt="A girl touching her face in a mirror."
				title="Betson, Ohio"
				subtitle="Novel in Calendar"
				href="studio/betson"
				comingSoon
			/>
			<CarouselLi
				src={CityJ}
				alt="A city lit up at night."
				title="Jukebox"
				subtitle="Music compositions."
				href="/studio/jukebox"
				comingSoon
			/>
			<CarouselLi
				src={FlowerP}
				alt="A bunch of worms poking up through a surreal landscape."
				title="Illustrations"
				subtitle="Visual art."
				href="/studio/illustrations"
				comingSoon
			/>
			<CarouselLi
				src={SnakesI}
				alt="A flower in the darkness."
				title="Postcards"
				subtitle="Sudden stories."
				href="studio/postcards"
				comingSoon
			/>
		</ul>
	</div>
</div>

<style>
	div.container {
		height: auto;
		max-width: 100%;
	}

	div.container > div {
		top: 0;
		max-width: 100%;
		overflow: hidden;
		padding-top: 4rem;
	}

	div.container > div > p {
		margin-bottom: 2.5rem;
		margin-left: 2.5rem;
		font-size: 2.25rem;
		font-weight: 500;
	}

	ul.carousel {
		display: flex;
		height: auto;
		width: auto;
		flex-direction: column;
		gap: 0.25rem;
		padding-top: 0.25rem;
	}

	@media (min-width: 768px) {
		div.container {
			height: 200vw;
		}

		div.container > div {
			position: sticky;
			height: 100vh;
		}

		div.container > div > p {
			font-size: 6rem;
		}

		ul.carousel {
			height: 80vh;
			width: 200vw;
			flex-direction: row;
		}
	}
</style>

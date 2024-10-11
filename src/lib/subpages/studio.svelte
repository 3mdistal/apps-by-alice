<script lang="ts">
	import CarouselLi from '$lib/subpages/studio/carousel-li.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { loadScrollTrigger } from '$lib/partials/load-scroll-trigger';

	// @ts-expect-error vite-imagetools not working properly
	import BirdTMI from '$images/studio/bird-tmi.jpg?webp';
	// @ts-expect-error vite-imagetools not working properly
	import FlowerP from '$images/studio/flower-p.jpg?webp';
	// @ts-expect-error vite-imagetools not working properly
	import MirrorB from '$images/studio/mirror-b.jpg?webp';
	// @ts-expect-error vite-imagetools not working properly
	import PianoHFC from '$images/studio/piano-hfc.jpg?webp';
	// @ts-expect-error vite-imagetools not working properly
	import CityJ from '$images/studio/city-j.jpg?webp';
	// @ts-expect-error vite-imagetools not working properly
	import SnakesI from '$images/studio/snakes-i.jpg?webp';

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

<div class="spacer" />

<div bind:this={container} class=" h-auto max-w-[100%] md:h-[200vw]">
	<div
		class="top-0 max-w-[100%] overflow-hidden pt-16 md:sticky md:h-[100vh]"
		style="background-color:{accent}"
	>
		<p class="mb-10 ml-10 text-4xl font-medium md:text-8xl" style="color:{background}">Works</p>

		<ul
			bind:this={carousel}
			class="flex h-auto w-auto flex-col gap-x-1 gap-y-1 pt-1 md:h-[80vh] md:w-[200vw] md:flex-row"
			style="background-color:{background}"
		>
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

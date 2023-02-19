<script>
	import CarouselLi from "./carousel-li.svelte";
	import { onMount } from "svelte";
	import gsap from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";

	import BirdTMI from "$images/studio/bird-tmi.jpg?webp";
	import FlowerP from "$images/studio/flower-p.jpg?webp";
	import MirrorB from "$images/studio/mirror-b.jpg?webp";
	import PianoHFC from "$images/studio/piano-hfc.jpg?webp";
	import CityJ from "$images/studio/city-j.jpg?webp";
	import SnakesI from "$images/studio/snakes-i.jpg?webp";

	export let accent;
	export let background;

	let container;
	let frame;
	let carousel;

	function scrollAnimate() {
		gsap.registerPlugin(ScrollTrigger);
		if (window.innerWidth > 768) {
			gsap.to(carousel, {
				x: "-100vw",
				scrollTrigger: {
					trigger: container,
					scrub: 0.5,
					start: "top top",
					end: "bottom bottom",
				},
			});
		}
	}

	onMount(() => {
		setTimeout(scrollAnimate, 1550);
	});
</script>

<div class="spacer"></div>

<div bind:this="{container}" class=" h-auto max-w-[100%] md:h-[200vw]">
	<div
		bind:this="{frame}"
		class="top-0 max-w-[100%] overflow-hidden pt-16 md:sticky md:h-[100vh]"
		style="background-color:{accent}"
	>
		<p
			class="ml-10 mb-10 text-4xl font-medium md:text-8xl"
			style="color:{background}"
		>
			Works
		</p>

		<ul
			bind:this="{carousel}"
			class="flex h-auto w-auto flex-col gap-y-1 gap-x-1 pt-1 md:h-[80vh] md:w-[200vw] md:flex-row"
			style="background-color:{background}"
		>
			<CarouselLi
				src="{BirdTMI}"
				alt="Watercolor bird, confident and flying."
				title="These Makeshift Idiotika"
				subtitle="A shifting, tilting world."
				href="studio/hfc"
			/>
			<CarouselLi
				src="{FlowerP}"
				alt="A flower in the darkness."
				title="Postcards"
				subtitle="Sudden stories."
				href="studio/postcards"
			/>
			<CarouselLi
				src="{MirrorB}"
				alt="A girl touching her face in a mirror."
				title="Betson, Ohio"
				subtitle="Novel in Calendar"
				href="studio/betson"
			/>
			<CarouselLi
				src="{PianoHFC}"
				alt="A relatively destroyed grand piano in front of the ruins of a building."
				title="Hymns for Calliope"
				subtitle="Poems"
				href="/studio/hfc"
			/>
			<CarouselLi
				src="{CityJ}"
				alt="A city lit up at night."
				title="Jukebox"
				subtitle="Music compositions."
				href="/studio/jukebox"
			/>
			<CarouselLi
				src="{SnakesI}"
				alt="A bunch of worms poking up through a surreal landscape."
				title="Illustrations"
				subtitle="Visual art."
				href="/studio/illustrations"
			/>
		</ul>
	</div>
</div>

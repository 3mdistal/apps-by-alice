<script>
	import { accentColors, backgroundColors, state } from '../../stores';
	import CarouselLi from './carousel-li.svelte';
	import { scroll, animate, glide } from 'motion';
	import { onMount } from 'svelte';

	let frame;
	let container;
	let carousel;

	const scrollOptions = {
		target: container,
		offset: ['start -1.5', 'end 1']
	};

	onMount(() => {
		if (window.innerWidth > 782) {
			scroll(animate(carousel, { translateX: ['0', '-50%'] }, { easing: glide }), scrollOptions);
		}
	});
</script>

<div class="spacer" />

<div bind:this={container} class=" h-auto max-w-[100%] md:h-[150vw]">
	<div
		bind:this={frame}
		class="max-h-none top-0 max-w-[100%] overflow-hidden pt-16 md:sticky md:max-h-[100vh]"
		style="background-color:{$accentColors[$state]}"
	>
		<p
			class="ml-10 mb-10 text-4xl font-medium md:text-8xl"
			style="color:{$backgroundColors[$state]}"
		>
			Works
		</p>

		<ul
			bind:this={carousel}
			class="flex h-auto w-auto flex-col gap-y-1 gap-x-1 pt-1 md:h-[80vh] md:w-[200%] md:flex-row"
			style="background-color:{$backgroundColors[$state]}"
		>
			<CarouselLi
				src="/images/studio/bird-tmi.jpg"
				alt="Watercolor bird, confident and flying."
				title="These Makeshift Idiotika"
				subtitle="A shifting, tilting world."
				href="/studio/tmi"
			/>
			<CarouselLi
				src="/images/studio/flower-p.jpg"
				alt="A flower in the darkness."
				title="Postcards"
				subtitle="Sudden stories."
				href="/studio/postcards"
			/>
			<CarouselLi
				src="/images/studio/mirror-b.jpg"
				alt="A girl touching her face in a mirror."
				title="Betson, Ohio"
				subtitle="Novel in Calendar"
				href="/studio/betson"
			/>
			<CarouselLi
				src="/images/studio/piano-hfc.jpg"
				alt="A relatively destroyed grand piano in front of the ruins of a building."
				title="Hymns for Calliope"
				subtitle="Poems"
				href="/studio/hfc"
			/>
			<CarouselLi
				src="/images/studio/city.jpg"
				alt="A city lit up at night."
				title="Jukebox"
				subtitle="Music compositions."
				href="/studio/jukebox"
			/>
			<CarouselLi
				src="/images/studio/house-hfc.jpg"
				alt="A black and white house, looking about 100 years old."
				title="Blog"
				subtitle="Thoughts about anything."
				href="/studio/blog"
			/>
			<CarouselLi
				src="/images/studio/snakes-tmi.jpg"
				alt="A bunch of worms poking up through a surreal landscape."
				title="Illustrations"
				subtitle="Visual art."
				href="/studio/illustrations"
			/>
		</ul>
	</div>
</div>

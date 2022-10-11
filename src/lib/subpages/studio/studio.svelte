<script>
	import { accentColors, backgroundColors, state } from '../../stores';
	import CarouselLi from './carousel-li.svelte';
	import { scroll, animate } from 'motion';
	import { onMount } from 'svelte';

	let frame;
	let container;
	let carousel;

	const scrollOptions = {
		target: container,
		offset: ['start -1.5', 'end 1']
	};

	onMount(() => {
		scroll(animate(carousel, { translateX: ['0', '-50%'] }), scrollOptions);
	});
</script>

<div class="spacer" />

<div bind:this={container} class="invisible ml-[5vw] h-[150vw] max-w-[90vw] md:visible">
	<div
		bind:this={frame}
		class="top-[-40px] max-w-[100%] overflow-x-hidden pt-24 md:sticky"
		style="background-color:{$accentColors[$state]}"
	>
		<p
			class="ml-10 mb-10 text-4xl font-medium md:text-8xl"
			style="color:{$backgroundColors[$state]}"
		>
			Works
		</p>

		<div
			bind:this={carousel}
			class="flex h-[90vh] w-[200%] flex-col gap-y-1 gap-x-1 pt-1 md:h-[80vh] md:flex-row md:pt-2"
			style="background-color:{$backgroundColors[$state]}"
		>
			<CarouselLi
				src="/images/studio/bird-tmi.jpg"
				alt="Watercolor bird, confident and flying."
				title="These Makeshit Idiotika"
				subtitle="A shifting, tilting world."
			/>
			<CarouselLi
				src="/images/studio/flower-p.jpg"
				alt="A flower in the darkness."
				title="Postcards"
				subtitle="Sudden stories."
			/>
			<CarouselLi
				src="/images/studio/mirror-b.jpg"
				alt="A girl touching her face in a mirror."
				title="Betson, Ohio"
				subtitle="Novel in Calendar"
			/>
			<CarouselLi
				src="/images/studio/piano-hfc.jpg"
				alt="A relatively destroyed grand piano in front of the ruins of a building."
				title="Hymns for Calliope"
				subtitle="Poems"
			/>
			<CarouselLi
				src="/images/studio/city.jpg"
				alt="A city lit up at night."
				title="Jukebox"
				subtitle="Music compositions."
			/>
			<CarouselLi
				src="/images/studio/house-hfc.jpg"
				alt="A black and white house, looking about 100 years old."
				title="Blog"
				subtitle="Thoughts about anything."
			/>
			<CarouselLi
				src="/images/studio/snakes-tmi.jpg"
				alt="A bunch of worms poking up through a surreal landscape."
				title="Illustrations"
				subtitle="Visual art."
			/>
		</div>
	</div>
</div>

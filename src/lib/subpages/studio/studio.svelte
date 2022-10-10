<script>
	import { accentColors, backgroundColors, state } from '../../stores';
	import CarouselLi from './carousel-li.svelte';
</script>

<div class="spacer" />

<div class="w-[100%]" style="background-color:{$accentColors[$state]}">
	<div class="spacer" />
	<p class="ml-3 mb-10 text-4xl font-medium md:text-8xl" style="color:{$backgroundColors[$state]}">
		Works
	</p>

	<div
		class="flex h-[90vh] w-[100%] flex-col gap-y-1 gap-x-1 px-0 py-1 md:h-[80vh] md:flex-row md:py-2 md:px-2"
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
	</div>
</div>

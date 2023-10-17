<script lang="ts">
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { onMount } from 'svelte';
	import { motionTransition } from '$lib/helpers';

	export let src = 'https://unsplash.it/1000/1000';
	export let alt = '';
	export let heading = 'Sorry, something went wrong.';
	export let text = 'This entry has not been properly fetched from the Notion CMS.';
	export let colorTheme = '1E110B, 37596D, B6663E, 94B6C9, E6FFFB';

	const outDuration = 0.5;
	const inDuration = 0.25;
	const blinkHalfDuration = 0.1;

	// Color handling
	function changeColors() {
		const colors = colorTheme.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
	}

	onMount(() => {
		changeColors();
	});
</script>

<!-- Medium Viewport -->
<div class="hidden h-screen flex-col items-center justify-center gap-y-10 px-40 md:flex">
	<h2
		class="text-center"
		in:motionTransition={{
			animation: { x: [-100, 0], opacity: [0, 1] },
			duration: inDuration,
			delay: outDuration
		}}
		out:motionTransition={{
			animation: { x: [0, -100], opacity: [1, 0] },
			duration: outDuration,
			delay: 0
		}}
	>
		{heading}
	</h2>
	<div class="flex items-center justify-center gap-x-20">
		<div class="relative max-w-[40%] overflow-hidden rounded-2xl">
			<img class="h-full w-full" {src} {alt} />
			<div
				class="absolute top-0 h-[50%] w-full translate-y-[-100%] bg-black"
				out:motionTransition={{
					animation: { y: ['-100%', '0%'] },
					duration: blinkHalfDuration,
					delay: outDuration - blinkHalfDuration
				}}
				in:motionTransition={{
					animation: { y: ['0%', '-100%'] },
					duration: blinkHalfDuration,
					delay: outDuration
				}}
			></div>
			<div
				class="absolute bottom-0 h-[50%] w-full translate-y-[100%] bg-black"
				out:motionTransition={{
					animation: { y: ['100%', '0%'] },
					duration: blinkHalfDuration,
					delay: outDuration - blinkHalfDuration
				}}
				in:motionTransition={{
					animation: { y: ['0%', '100%'] },
					duration: blinkHalfDuration,
					delay: outDuration
				}}
			></div>
		</div>
		<p
			class="max-w-[30ch] italic tracking-widest"
			in:motionTransition={{
				animation: { y: [100, 0], opacity: [0, 1] },
				duration: inDuration,
				delay: outDuration
			}}
			out:motionTransition={{
				animation: { y: [0, 100], opacity: [1, 0] },
				duration: outDuration,
				delay: 0
			}}
		>
			{text}
		</p>
	</div>
</div>

<!-- Mobile Viewport -->
<div class="flex h-screen flex-col items-center justify-center gap-y-8 p-6 md:hidden">
	<div class="relative overflow-hidden rounded-2xl">
		<img class="h-full w-full" {src} {alt} />
		<div
			class="absolute top-0 h-[50%] w-full translate-y-[-100%] bg-black"
			out:motionTransition={{
				animation: { y: ['-100%', '0%'] },
				duration: blinkHalfDuration,
				delay: outDuration - blinkHalfDuration
			}}
			in:motionTransition={{
				animation: { y: ['0%', '-100%'] },
				duration: blinkHalfDuration,
				delay: outDuration
			}}
		></div>
		<div
			class="absolute bottom-0 h-[50%] w-full translate-y-[100%] bg-black"
			out:motionTransition={{
				animation: { y: ['100%', '0%'] },
				duration: blinkHalfDuration,
				delay: outDuration - blinkHalfDuration
			}}
			in:motionTransition={{
				animation: { y: ['0%', '100%'] },
				duration: blinkHalfDuration,
				delay: outDuration
			}}
		></div>
	</div>
	<div>
		<h2
			class="mb-2 text-center"
			in:motionTransition={{
				animation: { x: [-100, 0], opacity: [0, 1] },
				duration: inDuration,
				delay: outDuration
			}}
			out:motionTransition={{
				animation: { x: [0, -100], opacity: [1, 0] },
				duration: outDuration,
				delay: 0
			}}
		>
			{heading}
		</h2>
		<p
			class="max-w-[30ch] text-[1rem] italic leading-snug tracking-widest opacity-90"
			in:motionTransition={{
				animation: { y: [100, 0], opacity: [0, 1] },
				duration: inDuration,
				delay: outDuration
			}}
			out:motionTransition={{
				animation: { y: [0, 100], opacity: [1, 0] },
				duration: outDuration,
				delay: 0
			}}
		>
			{text}
		</p>
	</div>
</div>

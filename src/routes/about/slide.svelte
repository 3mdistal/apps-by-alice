<script lang="ts">
	import { animate } from 'motion';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { onMount } from 'svelte';

	export let src = 'https://unsplash.it/1000/1000';
	export let alt = 'A picture of me';
	export let heading = 'A sample headline';
	export let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam quidem est dolorem
		tempora? Sequi, quasi dolor. Harum animi ab similique, magnam aliquid sint, in quaerat, hic
		veritatis provident assumenda?`;
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

	//Animations
	function headingIn(target: HTMLHeadingElement) {
		animate(
			target,
			{ x: [-100, 0], opacity: [0, 1] },
			{ duration: inDuration, delay: outDuration }
		);

		return {
			duration: (inDuration + outDuration) * 1000
		};
	}

	function headingOut(target: HTMLElement) {
		animate(target, { x: [-100], opacity: [0] }, { duration: outDuration });

		return {
			duration: outDuration * 1000
		};
	}

	function textIn(target: HTMLParagraphElement) {
		animate(target, { y: [100, 0], opacity: [0, 1] }, { duration: inDuration, delay: outDuration });

		return {
			duration: (inDuration + outDuration) * 1000
		};
	}

	function textOut(target: HTMLElement) {
		animate(target, { y: [100], opacity: [0] }, { duration: outDuration });

		return {
			duration: outDuration * 1000
		};
	}

	function curtainTopOut(target: HTMLDivElement) {
		animate(
			target,
			{ y: ['-100%', '0%'] },
			{ duration: blinkHalfDuration, delay: outDuration - blinkHalfDuration }
		);

		return {
			duration: 100
		};
	}

	function curtainBottomOut(target: HTMLDivElement) {
		animate(
			target,
			{ y: ['100%', '0%'] },
			{ duration: blinkHalfDuration, delay: outDuration - blinkHalfDuration }
		);

		return {
			duration: blinkHalfDuration * 1000
		};
	}

	function curtainTopIn(target: HTMLDivElement) {
		animate(target, { y: ['0%', '-100%'] }, { duration: blinkHalfDuration, delay: outDuration });

		return {
			duration: blinkHalfDuration * 1000
		};
	}

	function curtainBottomIn(target: HTMLDivElement) {
		animate(target, { y: ['0%', '100%'] }, { duration: blinkHalfDuration, delay: outDuration });

		return {
			duration: blinkHalfDuration * 1000
		};
	}
</script>

<div class="flex h-[100svh] flex-col items-center justify-center gap-y-10 px-40">
	<h2 class="text-center" in:headingIn out:headingOut>{heading}</h2>
	<div class="flex items-center justify-center gap-x-20">
		<div class="relative max-w-[40%] overflow-hidden rounded-2xl">
			<img class="h-full w-full" {src} {alt} />
			<div
				class="absolute top-0 h-[50%] w-full translate-y-[-100%] bg-black"
				out:curtainTopOut
				in:curtainTopIn
			></div>
			<div
				class="absolute bottom-0 h-[50%] w-full translate-y-[100%] bg-black"
				out:curtainBottomOut
				in:curtainBottomIn
			></div>
		</div>
		<p class="max-w-[30ch] italic tracking-widest" in:textIn out:textOut>
			{text}
		</p>
	</div>
</div>

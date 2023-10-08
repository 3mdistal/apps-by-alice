<script lang="ts">
	import { gsap } from 'gsap';

	export let src = 'https://unsplash.it/1000/1000';
	export let alt = 'A picture of me';
	export let heading = 'A sample headline';
	export let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam quidem est dolorem
		tempora? Sequi, quasi dolor. Harum animi ab similique, magnam aliquid sint, in quaerat, hic
		veritatis provident assumenda?`;

	const outDuration = 0.5;
	const inDuration = 0.25;
	const blinkHalfDuration = 0.1;

	function textIn(target: HTMLParagraphElement) {
		const tl = gsap.timeline();
		tl.fromTo(
			target,
			{
				opacity: 0,
				y: 100
			},
			{
				opacity: 1,
				y: 0,
				duration: inDuration,
				delay: outDuration
			}
		);

		return {
			duration: (inDuration + outDuration) * 1000
		};
	}

	function textOut(target: HTMLElement) {
		const tl = gsap.timeline();
		tl.fromTo(
			target,
			{
				opacity: 1,
				y: 0
			},
			{
				duration: outDuration,
				opacity: 0,
				y: 100
			}
		);

		return {
			duration: outDuration * 1000
		};
	}

	function curtainTopOut(target: HTMLDivElement) {
		const tl = gsap.timeline();
		tl.fromTo(
			target,
			{
				y: '-100%'
			},
			{
				delay: outDuration - blinkHalfDuration,
				duration: blinkHalfDuration,
				y: '0%'
			}
		);

		return {
			duration: 100
		};
	}

	function curtainBottomOut(target: HTMLDivElement) {
		const tl = gsap.timeline();
		tl.fromTo(
			target,
			{
				y: '100%'
			},
			{
				delay: outDuration - blinkHalfDuration,
				duration: blinkHalfDuration,
				y: '0%'
			}
		);

		return {
			duration: blinkHalfDuration * 1000
		};
	}

	function curtainTopIn(target: HTMLDivElement) {
		const tl = gsap.timeline();
		tl.fromTo(
			target,
			{
				y: '0%'
			},
			{
				delay: outDuration,
				duration: blinkHalfDuration,
				y: '-100%'
			}
		);

		return {
			duration: blinkHalfDuration * 1000
		};
	}

	function curtainBottomIn(target: HTMLDivElement) {
		const tl = gsap.timeline();
		tl.fromTo(
			target,
			{
				y: '0%'
			},
			{
				delay: outDuration,
				duration: blinkHalfDuration,
				y: '100%'
			}
		);

		return {
			duration: blinkHalfDuration * 1000
		};
	}
</script>

<div class="flex h-[100svh] max-w-[90%] flex-col items-center justify-center">
	<div class="relative mb-10 h-[40%] overflow-hidden rounded-2xl">
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
	<h2 class="text-center" in:textIn out:textOut>{heading}</h2>
	<p class="max-w-[30ch] text-[1rem]" in:textIn out:textOut>
		{text}
	</p>
</div>

<script lang="ts">
	import { animate } from 'motion';

	export let src = 'https://unsplash.it/1000/1000';
	export let alt = 'A picture of me';
	export let heading = 'A sample headline';
	export let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam quidem est dolorem
		tempora? Sequi, quasi dolor. Harum animi ab similique, magnam aliquid sint, in quaerat, hic
		veritatis provident assumenda?`;

	const outDuration = 0.5;
	const inDuration = 0.25;
	const blinkHalfDuration = 0.1;

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
		<p class="max-w-[30ch] text-3xl" in:textIn out:textOut>
			{text}
		</p>
	</div>
</div>

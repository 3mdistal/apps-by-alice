<script>
	import gsap from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";
	import { onMount } from "svelte";

	export let flexDirection = "row-reverse";
	export let accent;

	let container;
	let heading;
	let text;
	let image;

	function animate() {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: 1,
				markers: { startColor: "green", endColor: "red" },
				end: `bottom 80%`,
				start: `top ${calcHeight() < 600 ? '250%' : '100%'}`
			},
		});
		tl.from(heading, { opacity: 0, y: -50, delay: 0.25 });
		tl.from(text.children, { opacity: 0, y: 50, stagger: 0.25 });
		tl.from(image, { opacity: 0, scale: 1.2 }, "<");

		return tl;
	}

	function calcHeight() {
		return window.innerHeight
	}

	onMount(() => {
		setTimeout(animate, 1550);
	});
</script>

<div id="you" class="w-[75%] mx-auto" bind:this="{container}">
	<h2
		bind:this="{heading}"
		style="color: {accent}"
		class="text-left [&_*]:text-inherit md:text-center"
	>
		<slot name="heading" />
	</h2>
	<div
		class="flex-col md:flex gap-x-[3em] gap-y-[5em] justify-between items-start"
		style="flex-direction: {flexDirection}"
	>
		<div
			class="text children:mb-10 children:last:mb-0 text-left max-w-[60ch]"
			bind:this="{text}"
		>
			<slot name="text" style="color: {accent}" />
			<div class="mt-[3m] flex justify-center">
				<slot name="button" class="button" />
			</div>
		</div>

		<div
			class="max-w-[80%] mx-auto md:max-w-[50%] sticky top-[1em]"
			bind:this="{image}"
		>
			<slot name="image" />
		</div>
	</div>
</div>

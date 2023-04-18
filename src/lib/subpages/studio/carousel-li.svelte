<script lang="ts">
	import gsap from 'gsap';
	import { loadScrollTrigger } from '$lib/partials/load-scroll-trigger';
	import { onMount } from 'svelte';

	export let src = '';
	export let alt = '';
	export let title = '';
	export let subtitle = '';
	export let href = '';
	export let comingSoon = false;

	let container: HTMLAnchorElement;
	let textContainer: HTMLDivElement;

	function animateBlack(sti) {
		if (window.innerWidth <= 768) {
			gsap.registerPlugin(sti);
			const tl = gsap.timeline();
			tl.fromTo(
				textContainer,
				{
					opacity: 0
				},
				{
					opacity: 1,
					scrollTrigger: {
						trigger: container,
						scrub: true,
						start: '-100vh 80%',
						end: 'top 50%'
					}
				}
			).fromTo(
				textContainer,
				{
					opacity: 1
				},
				{
					opacity: 0,
					scrollTrigger: {
						trigger: container,
						scrub: true,
						start: '-100vh 10%',
						end: 'top -80%'
					}
				}
			);
		}
	}

	let scrollTriggerInstance;

	onMount(async () => {
		scrollTriggerInstance = await loadScrollTrigger();
		animateBlack(scrollTriggerInstance);
	});
</script>

<a
	data-sveltekit-preload-code="eager"
	{href}
	bind:this={container}
	class="group relative flex h-[30vh] w-[100%] grow basis-0 list-none flex-col items-center justify-center object-cover ease-in-out md:h-[100%] md:w-auto md:transition-all md:duration-500 md:hover:grow-[3]"
>
	<img {src} {alt} class="absolute z-0 w-[100%]" />
	<div
		bind:this={textContainer}
		class="z-10 h-[100%] w-[100%] bg-black bg-opacity-50 px-10 py-5 md:invisible md:h-auto md:w-auto md:opacity-0 md:transition-all md:duration-500 md:group-hover:visible md:group-hover:opacity-100"
	>
		<p
			class="font:extra-light text-white md:text-sm md:font-thin md:transition-all md:duration-500 md:group-hover:text-4xl"
		>
			{title}
		</p>
		<p
			class="font-medium text-white md:text-sm md:font-light md:transition-all md:duration-500 md:group-hover:text-2xl"
		>
			{subtitle}
		</p>
		{#if comingSoon}
			<p
				class="font-medium md:text-sm md:font-light md:transition-all md:duration-500 md:group-hover:text-2xl"
			>
				<em class="text-white">Coming soon.</em>
			</p>
		{/if}
	</div>
</a>

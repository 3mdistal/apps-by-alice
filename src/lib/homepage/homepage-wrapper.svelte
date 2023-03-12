<script lang="ts">
	import HomepageSection from './homepage-section/homepage-section.svelte';
	import { state, backgroundColors, names } from '../stores';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let changeBackground: Function;

	let homepageWrapper: HTMLElement;

	function springIn() {
		gsap.from(homepageWrapper.children, {
			scaleY: 0.3,
			opacity: 0,
			ease: 'elastic',
			duration: 2,
			delay: 1.5,
			stagger: 0.1
		});
	}

	function easeOut() {
		const tl = gsap.timeline();
		tl.to(homepageWrapper, { y: '10vh', ease: 'power4.out' });
		tl.to(homepageWrapper, { opacity: 0, delay: 0.15 });

		return tl;
	}

	function transitionOutWrapper() {
		let delay = 0.75;
		changeBackground(delay);
		easeOut();
	}

	onMount(() => {
		homepageWrapper.style.opacity = '1';
		springIn();
	});
</script>

<nav
	class="relative h-[100vh] w-[100%] opacity-0 md:absolute md:bottom-[-35vh]"
	bind:this={homepageWrapper}
>
	{#each $names as name}
		{#if $state == 'home' || name}
			<HomepageSection background={$backgroundColors[name]} {name} {transitionOutWrapper} />
		{/if}
	{/each}
</nav>

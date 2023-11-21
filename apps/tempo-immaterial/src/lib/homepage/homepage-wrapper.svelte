<script lang="ts">
	import HomepageSection from '$lib/homepage/homepage-section.svelte';
	import { backgroundColors, names } from '../stores';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

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
		easeOut();
	}

	onMount(() => {
		homepageWrapper.style.opacity = '1';
		springIn();
	});
</script>

<nav
	class="relative h-[100vh] w-[100%] opacity-0 lg:absolute lg:bottom-[-35vh]"
	bind:this={homepageWrapper}
>
	{#each $names as name}
		<HomepageSection background={$backgroundColors[name]} {name} {transitionOutWrapper} />
	{/each}
</nav>

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

<nav bind:this={homepageWrapper}>
	{#each $names as name}
		<HomepageSection background={$backgroundColors[name]} {name} {transitionOutWrapper} />
	{/each}
</nav>

<style lang="css">
	nav {
		position: relative;
		height: 100vh;
		width: 100%;
		opacity: 0;
	}

	@media (min-width: 1024px) {
		nav {
			position: absolute;
			bottom: -35vh;
		}
	}
</style>

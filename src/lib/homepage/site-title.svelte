<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { state } from '$lib/stores';

	let logo: HTMLImageElement;
	let siteTitle: HTMLParagraphElement;
	let subtitle: HTMLParagraphElement;

	function inAnimation() {
		const tl = gsap.timeline();

		tl.fromTo(
			logo,
			{
				opacity: 0,
				x: '-200%',
				rotation: '-360deg'
			},
			{
				opacity: 1,
				x: '0%',
				rotation: 0,
				duration: 1,
				ease: 'back'
			}
		);
		tl.to(siteTitle, { opacity: 1, duration: 0.5, ease: 'power1.in' }, '<');
		tl.to(subtitle, { opacity: 1, duration: 0.5, ease: 'power1.in' }, '<.5');

		return tl;
	}

	onMount(() => {
		inAnimation();
	});

	function outAnimation() {
		const tl = gsap.timeline();

		tl.to(logo, {
			opacity: 0,
			x: '-200%',
			rotation: '-360deg',
			ease: 'back'
		});
		tl.to(siteTitle, { opacity: 0, duration: 0.5, ease: 'power1.out' }, '<');
		tl.to(subtitle, { opacity: 0, duration: 0.5, ease: 'power1.out' }, '<');

		return tl;
	}
</script>

{#if $state === 'home'}
	<header
		out:outAnimation
		class="site-header-container mx-auto flex max-w-[80vw] flex-col items-center justify-around gap-y-[1em] sm:gap-y-[2em] md:flex-row lg:gap-x-[2em]"
	>
		<img
			bind:this={logo}
			src="images/logos/logo.svg"
			alt="The logo for Tempo Immaterial."
			class="w-16 opacity-0 sm:w-24 md:w-32 lg:w-48"
		/>
		<div>
			<p bind:this={siteTitle} class="site-title mb-[0.5em] text-center tracking-[0.4em] opacity-0">
				tempo immaterial
			</p>
			<p bind:this={subtitle} class="subtitle text-center tracking-[0.15em] opacity-0">
				work by alice alexandra moore
			</p>
		</div>
	</header>
{/if}

<style lang="scss">
	.site-title {
		font-size: clamp(1.5rem, 4vw, 3rem);
	}

	.subtitle {
		font-size: clamp(1rem, 2.5vw, 1.8rem);
	}
</style>

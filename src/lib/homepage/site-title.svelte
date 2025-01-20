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
	<header out:outAnimation class="site-header-container">
		<img
			bind:this={logo}
			src="images/logos/logo.svg"
			alt="The logo for Tempo Immaterial."
			class="logo"
		/>
		<div>
			<p bind:this={siteTitle} class="site-title">tempo immaterial</p>
			<p bind:this={subtitle} class="subtitle">work by alice alexandra moore</p>
		</div>
	</header>
{/if}

<style>
	.site-header-container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-right: auto;
		margin-left: auto;
		width: 80vw;
	}

	.logo {
		opacity: 0;
		width: 4rem;
	}

	.site-title {
		opacity: 0;
		margin-bottom: 0.5em;
		font-size: clamp(1.5rem, 4vw, 3rem);
		letter-spacing: 0.4em;
		text-align: center;
	}

	.subtitle {
		opacity: 0;
		font-size: clamp(1rem, 2.5vw, 1.8rem);
		letter-spacing: 0.15em;
		text-align: center;
	}

	@media (min-width: 640px) {
		.site-header-container {
			gap: 2em;
		}

		.logo {
			width: 6rem;
		}
	}

	@media (min-width: 768px) {
		.site-header-container {
			flex-direction: row;
		}

		.logo {
			width: 8rem;
		}
	}

	@media (min-width: 1024px) {
		.site-header-container {
			gap: 2em;
		}

		.logo {
			width: 12rem;
		}
	}
</style>

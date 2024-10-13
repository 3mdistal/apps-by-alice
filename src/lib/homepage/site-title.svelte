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
			<p bind:this={siteTitle} class="site-title">
				tempo immaterial
			</p>
			<p bind:this={subtitle} class="subtitle">
				work by alice alexandra moore
			</p>
		</div>
	</header>
{/if}

<style>
	.site-header-container {
		margin-left: auto;
		margin-right: auto;
		display: flex;
		max-width: 80vw;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		gap: 1em;
	}

	.logo {
		width: 4rem;
		opacity: 0;
	}

	.site-title {
		font-size: clamp(1.5rem, 4vw, 3rem);
		margin-bottom: 0.5em;
		text-align: center;
		letter-spacing: 0.4em;
		opacity: 0;
	}

	.subtitle {
		font-size: clamp(1rem, 2.5vw, 1.8rem);
		text-align: center;
		letter-spacing: 0.15em;
		opacity: 0;
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

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

<a data-sveltekit-preload-code="eager" {href} bind:this={container} class="carousel-item">
	<img {src} {alt} class="carousel-image" />
	<div bind:this={textContainer} class="text-container">
		<p class="title">
			{title}
		</p>
		<p class="subtitle">
			{subtitle}
		</p>
		{#if comingSoon}
			<p class="coming-soon">
				<em>Coming soon.</em>
			</p>
		{/if}
	</div>
</a>

<style lang="css">
	.carousel-item {
		position: relative;
		display: flex;
		height: 30vh;
		width: 100%;
		flex-grow: 1;
		flex-basis: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		list-style-type: none;

		@media (min-width: 768px) {
			height: 100%;
			width: auto;
			transition: all 0.5s ease-in-out;

			&:hover {
				flex-grow: 3;
			}
		}
	}

	.carousel-image {
		position: absolute;
		z-index: 0;
		width: 100%;
	}

	.text-container {
		z-index: 10;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 1.25rem 2.5rem;

		@media (min-width: 768px) {
			visibility: hidden;
			height: auto;
			width: auto;
			opacity: 0;
			transition: all 0.5s ease-in-out;

			.carousel-item:hover & {
				visibility: visible;
				opacity: 1;
			}
		}
	}

	.title {
		color: white;
		font-weight: 200;

		@media (min-width: 768px) {
			font-size: 0.875rem;
			font-weight: 100;
			transition: all 0.5s ease-in-out;

			.carousel-item:hover & {
				font-size: 2.25rem;
			}
		}
	}

	.subtitle {
		color: white;
		font-weight: 500;

		@media (min-width: 768px) {
			font-size: 0.875rem;
			font-weight: 300;
			transition: all 0.5s ease-in-out;

			.carousel-item:hover & {
				font-size: 1.5rem;
			}
		}
	}

	.coming-soon {
		font-weight: 500;

		@media (min-width: 768px) {
			font-size: 0.875rem;
			font-weight: 300;
			transition: all 0.5s ease-in-out;

			.carousel-item:hover & {
				font-size: 1.5rem;
			}
		}

		em {
			color: white;
		}
	}
</style>

<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { state } from '../stores';

	export let src = '';
	export let alt = '';
	export let header = '';
	export let description = '';
	export let noPadding = false;
	export let flexReverse = false;
	export let accent = '';
	export let background = '';
	export let textWhite = false;

	let container: HTMLDivElement;
	let bordered: HTMLDivElement;
	let topHeading: HTMLHeadingElement;
	let descriptor: HTMLParagraphElement;
	let button: HTMLDivElement;
	let imageWrapper: HTMLDivElement;

	function transitionIn() {
		const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
		tl.to(container.children, { opacity: 1, duration: 0 })
			.from(bordered, { x: -200 })
			.from(topHeading, { opacity: 0, y: -50 }, '0')
			.from(descriptor, { opacity: 0, y: 25, duration: 0.25 }, '>')
			.from(button, { opacity: 0, scale: 0.6, duration: 0.25 }, '<')
			.from(imageWrapper, { opacity: 0, scale: 1.5 }, '0');

		return tl;
	}

	onMount(() => {
		transitionIn();
	});

	onDestroy(() => {
		state.set('home');
	});
</script>

<div bind:this={container} class="container" style="background-color: {background}">
	<div class="content-wrapper" class:no-padding={noPadding} class:flex-reverse={flexReverse}>
		<div bind:this={bordered} class="bordered-content" style="border-color: {accent}">
			<h2 bind:this={topHeading} style="color: {accent}">
				{header}
			</h2>

			<p bind:this={descriptor} class:text-white={textWhite}>
				{description}
			</p>

			<div bind:this={button} class="button-wrapper">
				<slot name="button" />
			</div>
		</div>

		{#if src}
			<div bind:this={imageWrapper} class="image-wrapper" class:no-padding={noPadding}>
				<img {src} {alt} />
			</div>
		{:else}
			<div bind:this={imageWrapper} class="slot-image-wrapper">
				<slot name="image" />
			</div>
		{/if}
	</div>

	<slot />
</div>

<style>
	.container {
		padding-top: 10rem;
	}

	.container > * {
		opacity: 0;
	}

	.content-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 2.5rem;
		padding: 0 1.25rem;
	}

	@media (min-width: 768px) {
		.content-wrapper {
			flex-wrap: nowrap;
		}
	}

	@media (min-width: 1024px) {
		.content-wrapper {
			padding: 0 5rem;
		}
	}

	.content-wrapper.no-padding {
		justify-content: space-between;
	}

	.content-wrapper.flex-reverse {
		flex-direction: row-reverse;
	}

	.bordered-content {
		box-sizing: border-box;
		border-top-width: 3px;
		border-right-width: 0px;
		border-bottom-width: 3px;
		border-left-width: 0px;
		border-style: solid;
		border-radius: 5%;
		padding: 5rem 2.5rem;
	}

	@media (min-width: 640px) {
		.bordered-content {
			padding: 5rem 3.75rem;
		}
	}

	@media (min-width: 768px) {
		.bordered-content {
			flex-basis: 50%;
		}
	}

	@media (min-width: 1024px) {
		.bordered-content {
			padding: 10rem 5rem;
		}
	}

	.bordered-content h2 {
		margin-bottom: 1.25rem;
	}

	.button-wrapper {
		display: flex;
		justify-content: flex-end;
		margin-top: 2.5rem;
		margin-right: 1.25rem;
	}

	.image-wrapper {
		flex-basis: 100%;
		aspect-ratio: 1 / 1;
	}

	@media (min-width: 768px) {
		.image-wrapper {
			flex-basis: 50%;
		}
	}

	.image-wrapper.no-padding {
		margin-right: -1.25rem;
	}

	@media (min-width: 1024px) {
		.image-wrapper.no-padding {
			margin-right: -5rem;
		}
	}

	.image-wrapper img {
		object-fit: contain;
	}

	.slot-image-wrapper {
		margin-bottom: 2.5rem;
	}

	@media (min-width: 768px) {
		.slot-image-wrapper {
			flex-basis: 33.333333%;
			margin-bottom: 0;
			margin-left: 5rem;
		}
	}

	.text-white {
		color: white;
	}
</style>

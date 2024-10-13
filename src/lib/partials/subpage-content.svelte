<script lang="ts">
	import gsap from 'gsap';
	import { loadScrollTrigger } from '$lib/partials/load-scroll-trigger';
	import { onMount } from 'svelte';

	export let flexDirection = 'row-reverse';
	export let accent = '';
	export let imageSource = '';
	export let imageAlt = '';

	let container: HTMLElement;
	let heading: HTMLElement;
	let text: HTMLElement;
	let image: HTMLElement;

	function animate(sti: any) {
		gsap.registerPlugin(sti);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: 1,
				end: `bottom 80%`,
				start: `top ${calcHeight()}`
			}
		});
		tl.from(heading, { opacity: 0, y: -50, delay: 0.25 });
		tl.from(text.children, { opacity: 0, y: 50, stagger: 0.25 });
		tl.from(image, { opacity: 0, scale: 1.2, duration: 1, ease: 'power2.in' }, '<');

		return tl;
	}

	function calcHeight() {
		if (window.innerWidth <= 768) {
			return container.offsetHeight - 450;
		}
		return container.offsetHeight;
	}

	let scrollTriggerInstance;

	onMount(async () => {
		scrollTriggerInstance = await loadScrollTrigger();
		animate(scrollTriggerInstance);
	});
</script>

<div class="container" bind:this={container}>
	<h2 bind:this={heading} style="color: {accent}">
		<slot name="heading" />
	</h2>
	<div class="content" style="flex-direction: {flexDirection}">
		<div class="text" bind:this={text}>
			<slot name="text" style="color: {accent}" />
			<div class="button-container">
				<slot name="button" class="button" />
			</div>
		</div>

		<div class="image-container" bind:this={image}>
			<img src={imageSource} alt={imageAlt} />
		</div>
	</div>
</div>

<style>
	.container {
		margin-right: auto;
		margin-left: auto;
		width: 75%;
	}

	h2 {
		text-align: left;
	}

	h2 :global(*) {
		color: inherit;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		gap: 5em;
	}

	.text {
		max-width: 60ch;
		text-align: left;
	}

	.text :global(*) {
		margin-bottom: 2.5rem;
	}

	.text :global(*:last-child) {
		margin-bottom: 0;
	}

	.button-container {
		display: flex;
		justify-content: center;
		margin-top: 3em;
	}

	.image-container {
		position: sticky;
		top: 1em;
		margin-right: auto;
		margin-left: auto;
		max-width: 80%;
	}

	.image-container img {
		border-radius: 1.5rem;
	}

	@media (min-width: 768px) {
		h2 {
			text-align: center;
		}

		.content {
			flex-direction: row;
			gap: 3em;
		}

		.image-container {
			max-width: 50%;
		}
	}
</style>

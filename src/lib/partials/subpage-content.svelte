<script>
	import { state, accentColors } from '../stores';
	export let flexDirection = 'row-reverse';
	import { animate, inView, spring } from 'motion';
	import { onMount } from 'svelte';

	let heading;

	onMount(() => {
		inView(heading, () => {
			animate(
				heading,
				{ opacity: [0, 80, 90, 100], y: [-50, 0] },
				{
					delay: 0.25,
					easing: spring({ velocity: 1000, damping: 10 })
				}
			);
		});

		const paragraphs = document.querySelectorAll('.subpage-content-wrapper p');

		paragraphs.forEach((paragraph) => {
			inView(paragraph, () => {
				animate(paragraph, { opacity: [0, 80, 100], y: [25, 0] }, { duration: 1, delay: 0.25 });
			});
		});

		const images = document.querySelectorAll('.subpage-content-wrapper img:not(.social-img)');

		images.forEach((image) => {
			inView(image, () => {
				animate(
					image,
					{ opacity: [0, 1], scale: [1.2, 1] },
					{ easing: 'ease-in-out', duration: 1, delay: 0.5 }
				);
			});
		});
	});
</script>

<div class="wrapper subpage-content-wrapper">
	<h2 class="header-2" bind:this={heading} style="color: {$accentColors[$state]}">
		<slot name="heading" />
	</h2>
	<div class="content" style="flex-direction: {flexDirection}">
		<div class="text">
			<slot name="text" />
			<div class="button">
				<slot name="button" class="button" />
			</div>
		</div>
		<div class="image">
			<slot name="image" />
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 75%;
		margin: 0 auto;
		text-align: center;
	}

	.image {
		max-width: 50%;
		position: sticky;
		top: 1em;

		@media screen and (max-width: 45rem) {
			max-width: 80%;
			margin: 0 auto;
		}
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		column-gap: 5em;

		@media screen and (max-width: 45rem) {
			flex-direction: column !important;
			row-gap: 3em;
		}
	}

	.text {
		text-align: left;
		max-width: 60ch;
	}

	h2 {
		margin-bottom: 1.5em;

		@media screen and (max-width: 45rem) {
			text-align: left;
		}
	}

	.button {
		margin-top: 3em;
		display: flex;
		justify-content: center;
	}
</style>

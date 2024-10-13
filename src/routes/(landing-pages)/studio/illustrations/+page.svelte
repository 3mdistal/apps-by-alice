<script lang="ts">
	import TextMacro from '$lib/notion/text-macro.svelte';
	import gsap from 'gsap';
	import { onMount, afterUpdate } from 'svelte';

	export let data;

	// Extracting results from data
	const {
		illustrations: { results }
	} = data;

	// Variables
	let currentURL = '';
	let all = true;
	const lowQuality = '?tr=f-webp,w-400,q-50';
	let scrollPos = 0;
	let classList = ['sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5'];
	let artGrid: HTMLDivElement;
	let restoreScroll = false;

	// Lifecycle methods
	afterUpdate(() => {
		if (restoreScroll) {
			scrollToPosition(scrollPos);
			restoreScroll = false;
		} else {
			scrollToPosition(window.innerWidth < 500 ? 72 : 0);
		}
	});

	onMount(() => {
		fetch('/studio/illustrations', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});

	// Functions
	function scrollToPosition(position: number) {
		window.scrollTo(0, position);
	}

	function callback() {
		currentURL = '';
		restoreScroll = true;
		toggleView('add');
	}

	function manageHistory(add: boolean) {
		if (add) {
			history.pushState(null, '', '/studio/illustrations');
			window.addEventListener('popstate', callback);
		} else {
			history.back();
			window.removeEventListener('popstate', callback);
		}
	}

	function toggleView(addOrRemove?: 'add' | 'remove') {
		if (addOrRemove === 'add') {
			console.log('adding');
			artGrid.classList.add(...classList, 'p-2');
			all = true;
			return;
		} else if (addOrRemove === 'remove') {
			console.log('removing');
			artGrid.classList.remove(...classList, 'p-2');
			all = false;
			return;
		}
	}

	function handleClickToFullscreen({ currentTarget }: { currentTarget: Element }) {
		currentURL = currentTarget!.querySelector('img')!.src;
		scrollPos = window.scrollY;
		toggleView('remove');
		manageHistory(true);
		return;
	}

	function handleClickToGallery() {
		currentURL = '';
		toggleView('add');
		manageHistory(false);
		restoreScroll = true;
		return;
	}

	function lazyLoad(e: Event) {
		const img = e.currentTarget;
		if (img instanceof HTMLImageElement && img.dataset['src']) {
			img.src = img.dataset['src'];
			img.onload = () => {
				img.removeAttribute('data-src');
			};
			return;
		}
	}

	function fadeIn(div: HTMLDivElement) {
		if (document.documentElement.clientWidth < 500) {
			const tl = gsap.timeline();
			tl.to(div, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });

			return {
				update: () => tl
			};
		}

		const tl = gsap.timeline();
		tl.to(div, { opacity: 1, duration: 0.05 }).fromTo(
			div.children,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 0.5,
				ease: 'power2.inOut',
				stagger: { amount: 1, from: 'random' }
			}
		);

		return { update: () => tl };
	}
</script>

<svelte:head>
	<title>Illustrations</title>
	<meta
		name="description"
		content="Illustrations, paintings, and other visual art from Alice Alexandra Moore."
	/>
	<meta name="keywords" content="illustrations, paintings, visual art, alice alexandra moore" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com/studio/illustrations" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Illustrations" />
	<meta
		property="og:description"
		content="Illustrations, paintings, and other visual art from Alice Alexandra Moore."
	/>
	<meta
		property="og:image"
		content="https://ik.imagekit.io/tempoimmaterial/studio/illustrations/still%20across%20the%20waters?tr=w-750"
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com/studio/illustrations" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/studio/illustrations" />
	<meta name="twitter:title" content="Studio" />
	<meta
		name="twitter:description"
		content="Illustrations, paintings, and other visual art from Alice Alexandra Moore."
	/>
	<meta
		name="twitter:image"
		content="https://ik.imagekit.io/tempoimmaterial/studio/illustrations/still%20across%20the%20waters?tr=w-750"
	/>
	<meta name="twitter:image:alt" content="The illustrations page of alicealexandra.com." />
</svelte:head>

<div class="background">
	<!-- Art Grid -->
	<div class="art-grid" bind:this={artGrid} use:fadeIn>
		{#each results as painting}
			{#if all}
				<!-- Grid Items -->
				<a href="/studio/illustrations" on:click|preventDefault={handleClickToFullscreen}>
					<img
						src={painting.properties.Image.url + lowQuality}
						loading="lazy"
						alt=""
						class="grid-image"
						on:contextmenu|preventDefault
					/>
				</a>
			{:else if currentURL === painting.properties.Image.url + lowQuality}
				<!-- Fullscreen Image -->
				<div>
					<div class="fullscreen-container">
						<a href="/studio/illustrations" on:click|preventDefault={handleClickToGallery}>
							<img
								src={painting.properties.Image.url + lowQuality}
								data-src={painting.properties.Image.url + '?tr=f-webp,q-80'}
								alt=""
								class="fullscreen-image"
								on:contextmenu|preventDefault
								on:load|once={lazyLoad}
							/>
						</a>
					</div>
					<div class="info-container">
						<!-- Title -->
						<p class="title">{painting.properties.Name.title[0].plain_text}</p>

						<!-- Date -->
						<p class="date">
							<em>{painting.properties.Date.formula.string}</em>
						</p>

						<!-- Description -->
						<p class="description">
							<TextMacro type={painting.properties.Description} />
						</p>

						<!-- Back Button -->
						<a
							class="back-button"
							on:click|preventDefault={() => history.back()}
							href="/studio/illustrations"
						>
							back.
						</a>
						<div class="overlay" />
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.background {
		background-color: #111827;
	}

	.art-grid {
		gap: 0;
		opacity: 0;
		padding: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.grid-image {
		transition: all 0.3s ease-in-out;
		cursor: pointer;
		padding: 0.5rem;
		width: 100%;
	}

	.fullscreen-container {
		@media (min-width: 640px) {
			width: 100vw;
			height: 100vh;
		}
	}

	.fullscreen-image {
		padding-top: 4.5rem;
		width: 100%;
		height: 100%;
		object-fit: contain;

		@media (min-width: 640px) {
			position: fixed;
			padding-top: 0;
		}
	}

	.info-container {
		position: relative;
		padding: 2.5rem;
		width: 100vw;
		min-height: 20rem;

		@media (min-width: 640px) {
			z-index: 10;
		}
	}

	.title {
		color: white;
		font-size: 2.25rem;

		@media (min-width: 640px) {
			font-size: 3rem;
		}

		@media (min-width: 768px) {
			font-size: 3.75rem;
		}
	}

	.date {
		color: white;
		font-size: 1rem;
	}

	.description {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		max-width: 40ch;
		color: white;
		font-size: 1.25rem;

		@media (min-width: 768px) {
			max-width: 50ch;
		}

		@media (min-width: 1024px) {
			max-width: 60ch;
		}

		@media (min-width: 1280px) {
			font-size: 1.5rem;
		}
	}

	.back-button {
		display: block;
		cursor: pointer;
		color: white;
		font-size: 2.25rem;
		text-align: right;

		@media (min-width: 1024px) {
			position: absolute;
			right: 1.5rem;
			bottom: 1.5rem;
			padding: 1rem;
			font-size: 3.75rem;
		}
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 1;
		z-index: -10;
		background-color: #111827;
		width: 100%;
		height: 100%;

		@media (min-width: 640px) {
			opacity: 0.75;
		}
	}

	@media (min-width: 640px) {
		.art-grid {
			column-count: 2;
		}

		.grid-image:hover {
			transform: scale(1.05);
		}
	}

	@media (min-width: 768px) {
		.art-grid {
			column-count: 3;
		}
	}

	@media (min-width: 1024px) {
		.art-grid {
			column-count: 4;
		}
	}

	@media (min-width: 1280px) {
		.art-grid {
			column-count: 5;
		}
	}
</style>

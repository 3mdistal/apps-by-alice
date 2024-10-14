<script lang="ts">
	import TextMacro from '$lib/notion/text-macro.svelte';
	import gsap from 'gsap';
	import { onMount, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';

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
			artGrid.classList.add(...classList, 'p-2');
			all = true;
			return;
		} else if (addOrRemove === 'remove') {
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

	let selectedPainting: any = null;
	let modalOpen = false;
	let highResImageLoaded = false;

	function openModal(painting: any) {
		selectedPainting = painting;
		modalOpen = true;
		highResImageLoaded = false;
		document.body.style.overflow = 'hidden';

		// Load high-res image
		const highResImage = new Image();
		highResImage.src = painting.properties.Image.url + '?tr=f-webp,q-80';
		highResImage.onload = () => {
			highResImageLoaded = true;
		};
	}

	function closeModal() {
		modalOpen = false;
		selectedPainting = null;
		document.body.style.overflow = '';
	}

	function handleImageLoad(event: Event) {
		const img = event.target as HTMLImageElement;
		img.style.opacity = '1';
		const fallbackText = img.nextElementSibling as HTMLElement;
		if (fallbackText) {
			fallbackText.style.display = 'none';
		}
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
	<div class="art-grid">
		{#each results as painting}
			<div class="grid-item" on:click={() => openModal(painting)}>
				<img
					src={painting.properties.Image.url + '?tr=f-webp,w-400,q-50'}
					alt={painting.properties.Name.title[0].plain_text}
					class="grid-image"
					loading="lazy"
					on:load={handleImageLoad}
				/>
				<p class="fallback-text">{painting.properties.Name.title[0].plain_text}</p>
			</div>
		{/each}
	</div>

	{#if modalOpen}
		<div class="modal-overlay" on:click={closeModal} transition:fade={{ duration: 200 }}>
			<div class="modal-content">
				<img
					src={selectedPainting.properties.Image.url +
						(highResImageLoaded ? '?tr=f-webp,q-80' : '?tr=f-webp,w-400,q-50')}
					alt={selectedPainting.properties.Name.title[0].plain_text}
					class="modal-image"
				/>
				<div class="modal-info">
					<h2>{selectedPainting.properties.Name.title[0].plain_text}</h2>
					<p class="date"><em>{selectedPainting.properties.Date.formula.string}</em></p>
					<p class="description"><TextMacro type={selectedPainting.properties.Description} /></p>
				</div>
				<button class="close-button" on:click={closeModal}>×</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.background {
		background-color: #111827;
		padding: 0;
		min-height: 100vh;
		color: white;
	}

	.art-grid {
		column-gap: 0;
		column-count: 2;
	}

	.grid-item {
		position: relative;
		break-inside: avoid;
		margin-bottom: 0;
	}

	.grid-image {
		display: block;
		opacity: 0;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
		width: 100%;
		height: auto;
	}

	.grid-image:hover {
		transform: scale(1.05);
		z-index: 1;
	}

	.fallback-text {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		padding: 0.5rem;
		color: white;
		font-size: 0.8rem;
	}

	@media (min-width: 640px) {
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

	.modal-overlay {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.9);
		padding: 2rem;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.modal-content {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		padding: 2rem;
		width: min(90%, 1200px);
		overflow-y: auto;
	}

	.modal-image {
		margin-bottom: 1rem;
		max-width: 100%;
		max-height: 90vh;
		object-fit: contain;
	}

	.modal-info {
		width: 100%;
		max-width: 600px;
		color: #ffffff;
		text-align: center;
	}

	.modal-info h2 {
		margin-bottom: 0.5rem;
		color: #ffffff;
		font-size: 1.5rem;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.modal-info p {
		margin-bottom: 0.5rem;
		color: #e0e0e0;
	}

	.date em {
		color: #f0f0f0;
	}

	.description {
		color: #f0f0f0;
		line-height: 1.6;
		text-align: left;
	}

	.close-button {
		position: fixed;
		top: 1rem;
		right: 2rem;
		cursor: pointer;
		border: none;
		background: none;
		color: #ffffff;
		font-size: 2rem;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}
</style>

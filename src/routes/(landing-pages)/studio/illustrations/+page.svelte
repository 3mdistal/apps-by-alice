<script lang="ts">
	import TextMacro from '$lib/notion/text-macro.svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { browser } from '$app/environment';

	let gsap: any;
	let ScrollTrigger: any;

	onMount(async () => {
		if (browser) {
			const gsapModule = await import('gsap');
			const scrollTriggerModule = await import('gsap/ScrollTrigger');
			gsap = gsapModule.default;
			ScrollTrigger = scrollTriggerModule.default;
			gsap.registerPlugin(ScrollTrigger);
			initParallax();
		}
	});

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
	let artGrid: HTMLDivElement;
	let gridItems: HTMLDivElement[];
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

	// Functions
	function initParallax() {
		gridItems = Array.from(artGrid.querySelectorAll('.grid-item'));
		gridItems.forEach((item, index) => {
			gsap.fromTo(
				item,
				{
					y: 0
				},
				{
					y: 30,
					ease: 'none',
					scrollTrigger: {
						trigger: item,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1,
						toggleActions: 'play none none reverse'
					}
				}
			);
		});
	}

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
			artGrid.classList.add('p-2');
			all = true;
			return;
		} else if (addOrRemove === 'remove') {
			artGrid.classList.remove('p-2');
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
	const lowQualityParams = '?tr=f-webp,w-800,q-40';
	const highQualityParams = '?tr=f-webp,w-1600,q-85';

	function openModal(painting: any) {
		selectedPainting = painting;
		modalOpen = true;
		highResImageLoaded = false;
		document.body.style.overflow = 'hidden';

		// Preload high-res image
		const highResImage = new Image();
		highResImage.src = painting.properties.Image.url + highQualityParams;
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
	<div class="art-grid" bind:this={artGrid}>
		{#each results as painting, i}
			<div
				class="grid-item"
				on:click={() => openModal(painting)}
				style="--delay: {i * 0.1}s"
				in:scale={{
					duration: 800,
					delay: i * 100,
					easing: (t) => t * (2 - t)
				}}
			>
				<div class="image-wrapper">
					<img
						src={painting.properties.Image.url + lowQualityParams}
						alt={painting.properties.Name.title[0].plain_text}
						class="grid-image"
						loading="lazy"
						on:load={handleImageLoad}
					/>
					<div class="image-overlay">
						<h3>{painting.properties.Name.title[0].plain_text}</h3>
						<p class="date">{painting.properties.Date.formula.string}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if modalOpen}
		<div class="modal-overlay" on:click|self={closeModal} transition:fade={{ duration: 300 }}>
			<div class="modal-content" transition:scale={{ duration: 300 }}>
				<img
					src={selectedPainting.properties.Image.url +
						(highResImageLoaded ? highQualityParams : lowQualityParams)}
					alt={selectedPainting.properties.Name.title[0].plain_text}
					class="modal-image"
					style="opacity: {highResImageLoaded ? 1 : 0.99}"
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
		padding: 1rem;
		min-height: 100vh;
		color: white;
	}

	.art-grid {
		column-gap: 1.5rem;
		columns: 1;
		margin: 0 auto;
		padding: 1rem;
		width: 100%;
		max-width: 1800px;
	}

	.grid-item {
		break-inside: avoid;
		transform-origin: center;
		opacity: 0;
		animation: fadeIn 0.5s ease forwards;
		animation-delay: var(--delay);
		margin-bottom: 1.5rem;
	}

	.image-wrapper {
		position: relative;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}

	.image-wrapper:hover {
		transform: translateY(-4px) scale(1.02);
	}

	.grid-image {
		display: block;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		width: 100%;
		height: auto;
	}

	.image-overlay {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateY(100%);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
		padding: 1.5rem;
	}

	.image-wrapper:hover .image-overlay {
		transform: translateY(0);
	}

	.image-overlay h3 {
		margin: 0;
		color: white;
		font-weight: 500;
		font-size: 1.2rem;
	}

	.image-overlay .date {
		margin: 0.5rem 0 0;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
	}

	@keyframes fadeIn {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (min-width: 640px) {
		.art-grid {
			columns: 2;
		}
	}

	@media (min-width: 1024px) {
		.art-grid {
			columns: 3;
		}
	}

	@media (min-width: 1280px) {
		.art-grid {
			columns: 4;
		}
	}

	@media (min-width: 1536px) {
		.art-grid {
			columns: 5;
		}
	}

	.modal-overlay {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.95);
		padding: 2rem;
		overflow-y: auto;
	}

	.modal-content {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		backdrop-filter: blur(10px);
		border-radius: 12px;
		background-color: rgba(17, 24, 39, 0.8);
		padding: 2rem;
		max-width: 90vw;
		max-height: 90vh;
	}

	.modal-image {
		transition: opacity 0.3s ease;
		border-radius: 4px;
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
	}

	.modal-info {
		margin-top: 1.5rem;
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	.modal-info h2 {
		margin-bottom: 0.5rem;
		color: #ffffff;
		font-weight: 500;
		font-size: 1.75rem;
	}

	.modal-info .date {
		margin-bottom: 1rem;
		color: rgba(255, 255, 255, 0.95);
		font-style: italic;
		font-weight: 500;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.modal-info .description {
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.6;
		text-align: left;
	}

	.close-button {
		display: flex;
		position: absolute;
		top: 1rem;
		right: 1rem;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s ease;
		cursor: pointer;
		border: none;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		width: 2.5rem;
		height: 2.5rem;
		color: white;
		font-size: 1.5rem;
	}

	.close-button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
</style>

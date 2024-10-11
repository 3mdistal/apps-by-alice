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

<div class="bg-gray-900">
	<!-- Art Grid -->
	<div
		class="art-grid h-full w-full gap-x-0 p-2 opacity-0 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
		bind:this={artGrid}
		use:fadeIn
	>
		{#each results as painting}
			{#if all}
				<!-- TODO: On 'enter', goes to a white page for some reason. -->
				<!-- Grid Items -->
				<a href="/studio/illustrations" on:click|preventDefault={handleClickToFullscreen}>
					<img
						src={painting.properties.Image.url + lowQuality}
						loading="lazy"
						alt=""
						class="w-full cursor-pointer p-2 transition-all duration-300 ease-in-out sm:hover:scale-105"
						on:contextmenu|preventDefault
					/>
				</a>
			{:else if currentURL === painting.properties.Image.url + lowQuality}
				<!-- Fullscreen Image -->
				<div>
					<div class="sm:h-screen sm:w-screen">
						<a href="/studio/illustrations" on:click|preventDefault={handleClickToGallery}>
							<img
								src={painting.properties.Image.url + lowQuality}
								data-src={painting.properties.Image.url + '?tr=f-webp,q-80'}
								alt=""
								class="h-full w-full object-contain pt-[4.5rem] sm:fixed sm:pt-0"
								on:contextmenu|preventDefault
								on:load|once={lazyLoad}
							/>
						</a>
					</div>
					<div class="min-h-80 relative w-screen p-10 sm:z-10">
						<!-- Title -->
						<p class="text-4xl text-white sm:text-5xl md:text-6xl">
							{painting.properties.Name.title[0].plain_text}
						</p>

						<!-- Date -->
						<p class="text-[1rem]">
							<em class="text-white">{painting.properties.Date.formula.string}</em>
						</p>

						<!-- Description -->
						<p
							class="my-6 max-w-[40ch] text-xl text-white md:max-w-[50ch] lg:max-w-[60ch] xl:text-2xl"
						>
							<TextMacro type={painting.properties.Description} />
						</p>

						<!-- Back Button -->
						<a
							class="block cursor-pointer text-right text-4xl text-white lg:absolute lg:bottom-6 lg:right-6 lg:p-4 lg:text-6xl"
							on:click|preventDefault={() => history.back()}
							href="/studio/illustrations"
						>
							back.
						</a>
						<div
							class="absolute left-0 top-0 -z-10 h-full w-full bg-gray-900 opacity-100 sm:opacity-75"
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

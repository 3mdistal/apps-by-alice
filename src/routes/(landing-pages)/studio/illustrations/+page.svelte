<script lang="ts">
	import TextMacro from '$lib/notion/text-macro.svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let data;

	const {
		illustrations: { results }
	} = data;

	let currentURL = '';
	let all = true;
	const lowQuality = '?tr=f-webp,w-400,q-50';
	let scrollPos = 0;
	let classList = ['sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5'];
	let artGrid: HTMLDivElement;

	function callback() {
		currentURL = '';
		artGrid.classList.add(...classList, 'p-2');
		all = true;
	}

	function handleClick(event: Event) {
		currentURL = event.target.src;
		scrollPos = window.scrollY;
		artGrid.classList.remove(...classList, 'p-2');
		all = false;
		history.pushState(null, '', '/studio/illustrations');
		window.addEventListener('popstate', callback);
		return;
	}

	function handleClickB() {
		currentURL = '';
		artGrid.classList.add(...classList, 'p-2');
		all = true;
		window.removeEventListener('popstate', callback);
		return;
	}

	function scroll() {
		window.scrollTo(0, scrollPos);
	}

	function scroll2() {
		if (window.innerWidth < 500) {
			window.scrollTo(0, 72);
			return;
		}
		window.scrollTo(0, 0);
		return;
	}

	function lazyLoad() {
		const img: HTMLImageElement = document.querySelector('img[data-src]');
		if (img) {
			img.src = img.dataset.src;
			img.onload = () => {
				img.removeAttribute('data-src');
			};
		}
	}

	function fadeIn(event) {
		if (window.innerWidth < 500) {
			const tl = gsap.timeline();
			tl.to(event, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });

			return {
				update: () => tl
			};
		}

		const tl = gsap.timeline();
		tl.to(event, { opacity: 1, duration: 0.05 }).fromTo(
			'.art-grid > *',
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

	onMount(() => {
		fetch('/studio/illustrations', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});
</script>

<svelte:head>
	<title>Illustrations</title>
	<meta
		name="description"
		content="Illustrations, paintings, and other visual art from Alice Alexandra Moore."
	/>
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
				<a href="/studio/illustrations" on:click|preventDefault={handleClick} use:scroll>
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
						<a href="/studio/illustrations" on:click|preventDefault={handleClickB}>
							<img
								src={painting.properties.Image.url + lowQuality}
								data-src={painting.properties.Image.url + '?tr=f-webp,q-80'}
								alt=""
								class="h-full w-full object-contain pt-[4.5rem] sm:fixed sm:pt-0"
								on:contextmenu|preventDefault
								on:load|once={lazyLoad}
								use:scroll2
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

<script lang="ts">
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

	function handleClick(event: Event) {
		currentURL = event.target.src;
		scrollPos = window.scrollY;
		artGrid.classList.remove(...classList, 'p-2');

		all = false;
		history.pushState(null, '', '/studio/illustrations/');
		window.addEventListener('popstate', () => {
			currentURL = '';
			artGrid.classList.add(...classList);
			all = true;
		});
		return;
	}

	function handleClickB() {
		currentURL = '';
		artGrid.classList.add(...classList, 'p-2');
		all = true;
		window.removeEventListener('popstate', () => {
			currentURL = '';
			artGrid.classList.add(...classList);
		});
		all = true;
		return;
	}

	function scroll() {
		window.scrollTo(0, scrollPos);
		if (window.innerWidth > 500) {
			fadeIn();
		}
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

	function fadeIn() {
		const tl = gsap.timeline();
		tl.to('.art-grid > *', {
			opacity: 1,
			duration: 0.2,
			ease: 'power2.inOut',
			stagger: { amount: 1, from: 'random' }
		});

		return tl;
	}
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
		class="art-grid h-full w-full gap-x-0 p-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
		bind:this={artGrid}
	>
		{#each results as painting}
			{#if all}
				<img
					src={painting.properties.Image.url + lowQuality}
					loading="lazy"
					alt=""
					class="w-full cursor-pointer p-2 transition-all duration-300 ease-in-out sm:opacity-0 sm:hover:scale-105"
					on:click={handleClick}
					on:contextmenu|preventDefault
					use:scroll
				/>
			{:else if currentURL === painting.properties.Image.url + lowQuality}
				<div class="h-screen w-screen">
					<img
						src={painting.properties.Image.url + lowQuality}
						data-src={painting.properties.Image.url + '?tr=f-webp,q-80'}
						alt=""
						class="h-full w-full object-contain"
						on:click={handleClickB}
						on:contextmenu|preventDefault
						on:load|once={lazyLoad}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>

<script lang="ts">
	export let data;

	const {
		illustrations: { results }
	} = data;

	let currentURL = '';
	let all = true;
	const lowQuality = '?tr=f-webp,w-400,q-50';
	let scrollPos = 0;
	let classList = ['sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5'];
	let artGrid;

	function handleClick(event) {
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
	}

	function lazyLoad() {
		const img = document.querySelector('img[data-src]');
		console.log(img);
		img.src = img.dataset.src;
		img.onload = () => {
			img.removeAttribute('data-src');
		};
	}
</script>

<svelte:head>
	<title>Illustrations</title>
	<meta
		name="description"
		content="Illustrations, paintings, and other visual art from Alice Alexandra Moore."
	/>
</svelte:head>

<!-- Art Grid -->
<div
	class="h-full w-full gap-x-0 bg-gray-800 p-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
	bind:this={artGrid}
>
	{#each results as painting}
		{#if all}
			<img
				src={painting.properties.Image.url + lowQuality}
				alt=""
				class="w-full p-2 transition-all duration-300 ease-in-out sm:hover:scale-105"
				on:click={handleClick}
				on:contextmenu|preventDefault
				use:scroll
			/>
		{:else if currentURL === painting.properties.Image.url + lowQuality}
			<div class="h-screen w-screen">
				<img
					src={painting.properties.Image.url + lowQuality}
					data-src={painting.properties.Image.url + '?tr=f-webp,q-50'}
					alt=""
					class="h-full w-full object-contain"
					on:click={handleClickB}
					on:contextmenu|preventDefault
					on:load={lazyLoad}
				/>
			</div>
		{/if}
	{/each}
</div>

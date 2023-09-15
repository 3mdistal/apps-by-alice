<script>
	export let data;

	const {
		illustrations: { results }
	} = data;

	let currentURL = '';
	let all = true;

	function handleClick(event) {
		if (all === true) {
			currentURL = event.target.src;
			console.log(currentURL);
			document
				.getElementsByClassName('art-grid')[0]
				.classList.remove('sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5');

			all = false;
			history.pushState(null, null, '/studio/illustrations/');
			window.addEventListener('popstate', () => {
				currentURL = '';
				document
					.getElementsByClassName('art-grid')[0]
					.classList.add('sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5');
				all = true;
			});
			return;
		}
		if (all === false) {
			currentURL = '';
			document
				.getElementsByClassName('art-grid')[0]
				.classList.add('sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5');
			all = true;
			window.removeEventListener('popstate', () => {
				currentURL = '';
				document
					.getElementsByClassName('art-grid')[0]
					.classList.add('sm:columns-2', 'md:columns-3', 'lg:columns-4', 'xl:columns-5');
				all = true;
			});
			return;
		}
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
	class="art-grid h-full w-full gap-x-0 bg-gray-800 p-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
>
	{#each results as painting}
		{#if all}
			<img
				src={painting.properties.Image.url + '?tr=f-webp,q-10'}
				alt=""
				class="w-full p-2 transition-all duration-300 ease-in-out sm:hover:scale-105"
				on:click={handleClick}
			/>
		{:else if currentURL === painting.properties.Image.url + '?tr=f-webp,q-10'}
			<img
				src={painting.properties.Image.url + '?tr=f-webp,q-50'}
				alt=""
				class="w-full p-2 transition-all duration-300 ease-in-out sm:hover:scale-105"
				on:click={handleClick}
			/>
		{/if}
	{/each}
</div>

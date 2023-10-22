<script>
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { replaceSpaces } from '$lib/helpers';

	export let data;

	const {
		categories: { results: categories },
		posters: { results: posters }
	} = data;

	const imagekitPrefix = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/films/`;
	const imagekitSuffix = `?tr=q-50`;

	function changeColors() {
		const colors = ['032024', '235853', '977294', 'B5DBE3', 'E7EDEF'];
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
	}

	onMount(() => {
		changeColors();
	});
</script>

<svelte:head>
	<title>Films - Anthropotpourri</title>
	<meta name="title" content="Films - Anthropotpourri" />
	<meta name="description" content="The films that Shorouk Elkobrsi has contributed to." />
	<meta
		name="keywords"
		content="film, cinematography, production, shorouk, elkobrsi, about, journey"
	/>
	<meta name="author" content="Shorouk Elkobrsi" />

	<!-- Facebook -->
	<meta property="og:title" content="Films - Anthropotpourri" />
	<meta property="og:site_name" content="Anthropotpourri" />
	<meta property="og:description" content="The films that I've contributed to." />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://unsplash.it/1600/900" />
	<meta property="og:url" content="https://anthropotpourri.com/films" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Films - Anthropotpourri" />
	<meta name="twitter:description" content="The films that I've contributed to." />
	<meta name="twitter:image" content="https://unsplash.it/1600/900" />
	<meta name="twitter:site" content="@shoroukelkobrsi" />
</svelte:head>

<section
	class="flex min-h-screen w-screen flex-col items-center justify-center bg-[var(--dark)] px-10 py-20 md:px-40 md:py-40"
>
	<div class="flex flex-col items-center justify-center">
		{#each categories as category}
			<h2 class="mb-10 md:mb-20">{category.properties.Name.title[0].plain_text}</h2>
			<div class="grid grid-flow-row gap-10 md:grid-flow-col md:grid-rows-2">
				{#each posters as poster}
					{#if poster.properties.Category.relation[0].id === category.id}
						<a
							href={poster.properties.Link.url
								? poster.properties.Link.url
								: `/films/${replaceSpaces(poster.properties.Name.title[0].plain_text, false)}`}
							class="relative aspect-[1/1.41] w-full overflow-hidden rounded-2xl [&>div.background]:hover:opacity-60 [&>div.text]:hover:opacity-100"
						>
							<img
								class="h-full w-full object-cover"
								src={imagekitPrefix + poster.properties.Name.title[0].plain_text + imagekitSuffix}
								alt={poster.properties.Name.title[0].plain_text}
							/>
							<div
								class="background absolute left-0 top-0 h-full w-full bg-black opacity-0 transition-opacity duration-300"
							></div>
							<div
								class="text absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center px-10 opacity-0 transition-opacity duration-500"
							>
								<p class="text-center text-[var(--light)]">
									{poster.properties.Role.rich_text[0].plain_text}
								</p>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</section>

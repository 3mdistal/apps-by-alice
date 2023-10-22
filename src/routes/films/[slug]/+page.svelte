<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import NotionPageParser from '$lib/notion-page-parser.svelte';

	export let data;

	let {
		parent: {
			parentProject: parent,
			stills,
			info: { results: info }
		}
	} = data;

	const name = parent.properties.Name.title[0].plain_text;
	const logline = parent.properties.Logline.rich_text[0].plain_text;
	const date = parent.properties.Date.rich_text[0].plain_text;

	const imageKit = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/films/`;
	const suffix = `?tr=w-1000`;

	function changeColors() {
		const colors = parent.properties.Colors.rich_text[0].plain_text.split(',');
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
	<title>{name}</title>
</svelte:head>

<!-- Hero Trailer -->
<div
	class="grid h-screen w-screen grid-rows-5 place-content-stretch place-items-stretch bg-black px-2 sm:grid-rows-4 sm:px-10"
>
	<div
		class="row-span-1 row-start-2 grid h-full place-content-center place-items-center sm:row-start-1"
	>
		<h1 class="text-6xl text-[var(--midLight)] sm:text-8xl">{name}</h1>
		<p class="text-center text-[.9rem] italic sm:text-[1.1rem]">{date}</p>
	</div>

	<iframe
		src={`https://player.vimeo.com/video/${parent.properties.Trailer.rich_text[0].plain_text}`}
		title="vimeo-player"
		frameborder="0"
		allowfullscreen
		class="row-span-2 row-start-3 w-full sm:row-span-3 sm:row-start-2 sm:pb-10"
	></iframe>
</div>

<!-- Stills -->
<div
	class="grid min-h-screen w-screen place-content-center place-items-center bg-[var(--dark)] px-[10%] py-20 sm:py-10"
>
	<div class="grid grid-rows-3 place-items-center">
		<div
			class="row-span-2 grid grid-cols-1 place-content-center place-items-center gap-4 sm:grid-cols-3"
		>
			{#each stills as still}
				<img
					src={imageKit +
						replaceSpaces(name) +
						'/' +
						still.properties.Name.title[0].plain_text +
						suffix}
					alt=""
					class="rounded-xl object-cover sm:rounded-2xl"
				/>
			{/each}
		</div>
		<div>
			<p class="mb-8 italic">{logline}</p>
			<NotionPageParser results={info} />
		</div>
	</div>
</div>

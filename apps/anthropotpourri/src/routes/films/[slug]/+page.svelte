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
			info: { results: info },
			poster
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
	<title>{name} - Anthropotpourri</title>
	<meta name="title" content="{name} - Anthropotpourri" />
	<meta name="description" content="A film by Shorouk Elkobrsi." />
	<meta name="keywords" content="{name}, film, cinematography, production, shorouk, elkobrsi" />
	<meta name="author" content="Shorouk Elkobrsi" />

	<!-- Facebook -->
	<meta property="og:title" content="{name} - Anthropotpourri" />
	<meta property="og:site_name" content="Anthropotpourri" />
	<meta property="og:description" content="A film by Shorouk Elkobrsi." />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://unsplash.it/1600/900" />
	<meta
		property="og:url"
		content="https://anthropotpourri.com/films/{replaceSpaces(name, false)}"
	/>
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{name} - Anthropotpourri" />
	<meta name="twitter:description" content="A film by Shorouk Elkobrsi." />
	<meta name="twitter:image" content="https://unsplash.it/1600/900" />
	<meta name="twitter:site" content="@shoroukelkobrsi" />
</svelte:head>

<!-- Hero Trailer -->

{#if parent.properties.Trailer.rich_text.length > 0}
	<div
		class="grid h-[100dvh] w-screen grid-rows-5 place-content-stretch place-items-stretch bg-black px-2 sm:grid-rows-4 sm:px-10"
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
{:else}
	<div
		class="grid h-[100dvh] w-screen grid-rows-[repeat(7,1fr)] place-content-stretch place-items-stretch gap-y-4 bg-black px-2 pb-10 sm:grid-rows-4 sm:px-10 sm:pb-0"
	>
		<div
			class="row-span-1 row-start-2 grid h-full place-content-center place-items-center sm:row-start-1"
		>
			<h1 class="text-6xl text-[var(--midLight)] sm:text-8xl">{name}</h1>
			<p class="text-center text-[.9rem] italic sm:text-[1.1rem]">{date}</p>
		</div>
		<img
			src="https://ik.imagekit.io/tempoimmaterial/anthropotpourri/films/{poster}"
			alt="Movie poster."
			class="row-span-5 row-start-3 w-full object-contain sm:row-span-3 sm:row-start-2 sm:pb-10"
		/>
	</div>
{/if}

<!-- Stills -->
<div class="flex min-h-[100dvh] items-center justify-center bg-[var(--dark)] px-[10%] py-20">
	<div class="flex flex-col gap-y-24 md:grid">
		<div
			class="col-span-4 grid grid-cols-1 place-content-center place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3"
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
		<div class="col-span-2">
			<p class="italic">{logline}</p>
			<hr class="my-6 border-t-[.5px] border-[var(--mid)]" />
			<div class="[&_p]:mb-6">
				<NotionPageParser results={info} />
			</div>
			<hr class="my-6 border-t-[.5px] border-[var(--mid)]" />
		</div>
	</div>
</div>

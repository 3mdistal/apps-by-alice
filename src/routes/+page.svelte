<script lang="ts">
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light, menuOpen } from '$lib/stores';
	import NotionPageParser from '$lib/notion-page-parser.svelte';
	import StudioEntry from './studio-entry.svelte';
	import { replaceSpaces } from '$lib/helpers';

	// Import Notion Data
	export let data;

	let video: HTMLVideoElement;

	let {
		reels: { results },
		studioGalleryContent: { results: studioGalleryContent },
		aboutContent: { results: aboutContent },
		highQuality
	} = data;

	// State Variables
	let currentVideo = 0;

	// Color handling
	function changeColors() {
		const colors = results[currentVideo].properties.Colors.rich_text[0].plain_text.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
		document.querySelector('#studio').style.backgroundColor = `#${$dark}`;
		document.querySelector('#about').style.backgroundColor = `#${$mid_dark}`;
	}

	// Video Player
	const suffix = highQuality ? '?tr=ac-none,q-40' : '?tr=ac-none,q-10';

	function handleVideoEnded() {
		if (currentVideo < results.length - 1) {
			currentVideo++;
		} else {
			currentVideo = 0;
		}

		changeColors();
	}

	function preloadNextVideo() {
		const nextVideo = document.createElement('video');
		if (currentVideo < results.length - 1) {
			nextVideo.src = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${replaceSpaces(
				results[currentVideo + 1].properties.Name.title[0].plain_text
			)}${suffix}`;
		} else {
			nextVideo.src = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${replaceSpaces(
				results[0].properties.Name.title[0].plain_text
			)}${suffix}`;
		}
	}

	// Lifecycle
	onMount(() => {
		changeColors();
		fetch('/', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'LYm7iK3gwhoFu$aRE3XKtQZFqM@up5rW'
			}
		});
	});
</script>

<svelte:head>
	<title>Anthropotpourri</title>
	<meta name="description" content="The cinematography portfolio of Shorouk Elkobrsi." />
	<meta name="keywords" content="film, cinematography, production, house, shorouk, elkobrsi" />
	<meta name="author" content="Anthropotpourri" />

	<!-- Facebook -->
	<meta property="og:title" content="Anthropotpourri" />
	<meta property="og:description" content="The cinematography portfolio of Shorouk Elkobrsi." />
	<meta property="og:image" content="https://unsplash.it/1600/900" />
	<meta property="og:url" content="https://anthropotpourri.com" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:title" content="Anthropotpourri" />
	<meta name="twitter:description" content="The cinematography portfolio of Shorouk Elkobrsi." />
	<meta name="twitter:image" content="https://unsplash.it/1600/900" />
</svelte:head>

{#if !$menuOpen}
	<div id="home" class="[&_h1]:select-none [&_h2]:select-none [&_p]:select-none">
		<!-- Fullscreen Reel -->
		<div class="sticky top-0 min-h-screen w-screen">
			<video
				bind:this={video}
				autoplay
				muted
				playsinline
				class="-z-10 min-h-screen w-screen object-cover"
				src={`https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${replaceSpaces(
					results[currentVideo].properties.Name.title[0].plain_text
				)}${suffix}`}
				on:ended={handleVideoEnded}
				on:canplaythrough={preloadNextVideo}
			>
			</video>
		</div>

		<!-- Overlay -->
		<div class="z-100 relative min-h-screen w-screen">
			<div class="absolute h-full w-full bg-[var(--dark)] opacity-70" />
			<div class="relative flex min-h-screen w-full items-center justify-center">
				<div class="w-3/4 md:w-screen lg:w-1/2 [&_p]:max-w-[50ch]">
					<h1 class="mb-2 font-serif text-6xl italic text-[var(--midLight)] md:hidden md:text-8xl">
						anthro-<br />potpourri
					</h1>
					<h1
						class="mb-2 hidden text-center font-serif italic text-[var(--midLight)] md:block md:text-8xl"
					>
						anthropotpourri
					</h1>
					<p class="mb-4 text-center italic text-[var(--light)] md:text-right md:text-2xl">
						the cinema of Shorouk Elkobrsi
					</p>
				</div>
			</div>
		</div>
	</div>

	<div
		id="about"
		class="flex min-h-screen w-screen items-center justify-center bg-[var(--midDark)] py-[25vh]"
	>
		<div class="w-3/4 md:w-1/2 [&_h2]:select-none [&_p]:select-none">
			<h2 class="mb-12 font-serif text-6xl text-[var(--midLight)] md:text-8xl">
				a tiny mountain village where it...
			</h2>
			<div
				class="max-w-[50ch] md:text-2xl [&_a]:font-semibold [&_a]:text-[var(--midLight)] hover:[&_a]:text-[var(--mid)] [&_p]:mb-4 [&_p]:text-[var(--light)]"
			>
				<NotionPageParser results={aboutContent} />
			</div>
		</div>
	</div>

	<div
		id="studio"
		class="min-w-screen flex min-h-screen flex-wrap items-start justify-center gap-x-32 gap-y-24 bg-[var(--dark)] px-4 py-[25vh] transition-all duration-700 ease-in-out sm:px-16 md:px-32 [&_h2]:select-none [&_p]:select-none"
	>
		{#each studioGalleryContent as studioGalleryResult}
			<StudioEntry {studioGalleryResult} on:changeColor={changeColors} />
		{/each}
	</div>
{/if}

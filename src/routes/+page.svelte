<script lang="ts">
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light, menuOpen } from '$lib/stores';
	import NotionPageParser from '$lib/notion-page-parser.svelte';

	// Import Notion Data
	export let data;

	let {
		reels: { results },
		aboutContent: { results: aboutContent }
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
	}

	// Video Player
	function handleVideoEnded() {
		if (currentVideo < results.length - 1) {
			currentVideo++;
		} else {
			currentVideo = 0;
		}

		changeColors();
	}

	function preloadNextVideo() {
		if (currentVideo < results.length - 1) {
			const nextVideo = document.createElement('video');
			nextVideo.src = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${
				results[currentVideo + 1].properties.Name.title[0].plain_text
			}`;
		} else {
			const nextVideo = document.createElement('video');
			nextVideo.src = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${results[0].properties.Name.title[0].plain_text}`;
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
	<meta
		name="description"
		content="A film production house run by Shorouk Elkobrsi and Alice Moore."
	/>
	<meta name="keywords" content="film, production, house, shorouk, elkobrsi, alice, moore" />
	<meta name="author" content="Anthropotpourri" />

	<!-- Facebook -->
	<meta property="og:title" content="Anthropotpourri" />
	<meta
		property="og:description"
		content="A film production house run by Shorouk Elkobrsi and Alice Moore."
	/>
	<meta property="og:image" content="https://unsplash.it/1600/900" />
	<meta property="og:url" content="https://anthropotpourri.com" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:title" content="Anthropotpourri" />
	<meta
		name="twitter:description"
		content="A film production house run by Shorouk Elkobrsi and Alice Moore."
	/>
	<meta name="twitter:image" content="https://unsplash.it/1600/900" />
</svelte:head>

{#if !$menuOpen}
	<div id="home" class="[&_h1]:select-none [&_h2]:select-none [&_p]:select-none">
		<!-- Fullscreen Reel -->
		<div class="sticky top-0 min-h-screen w-screen">
			<video
				autoplay
				muted
				class="min-h-screen w-screen object-cover"
				src={`https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${results[currentVideo].properties.Name.title[0].plain_text}`}
				on:ended={handleVideoEnded}
				on:canplaythrough={preloadNextVideo}
			>
			</video>
		</div>

		<!-- Overlay -->
		<div class="relative min-h-screen w-screen">
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
		id="studio"
		class="flex min-h-screen w-screen items-center justify-center bg-[var(--dark)] [&_h2]:select-none [&_p]:select-none"
	>
		<p class="font-serif text-3xl text-[var(--midLight)] md:text-6xl">studio coming soon...</p>
	</div>

	<div
		id="about"
		class="flex min-h-screen w-screen items-center justify-center bg-[var(--midDark)]"
	>
		<div class="h-[50vh] w-3/4 md:w-1/2 [&_h2]:select-none [&_p]:select-none">
			<h2 class="mb-2 font-serif text-6xl text-[var(--midLight)] md:text-8xl">about</h2>
			<div
				class="max-w-50ch md:text-2xl [&_a]:font-bold [&_a]:text-[var(--midLight)] hover:[&_a]:text-[var(--mid)] [&_p]:mb-4 [&_p]:text-[var(--light)]"
			>
				<NotionPageParser results={aboutContent} />
			</div>
		</div>
	</div>
{/if}

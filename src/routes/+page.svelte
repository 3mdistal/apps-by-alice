<script lang="ts">
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light, homepageOpen } from '$lib/stores';
	import NotionPageParser from '$lib/notion-page-parser.svelte';
	import GalleryVideo from './gallery-video.svelte';
	import { replaceSpaces, createIntersectionObserver } from '$lib/helpers';
	import TextMacro from '$lib/text-macro.svelte';

	// Import Notion Data
	export let data;

	let video: HTMLVideoElement;

	let {
		reels: { results },
		videos: { results: videos },
		projects: { results: projects },
		aboutHeading: { toggle: aboutHeading },
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
		document.querySelector('#portfolio').style.backgroundColor = `#${$dark}`;
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
		createIntersectionObserver(video);
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

{#if $homepageOpen}
	<div class="snap-y snap-proximity">
		<div class="flex h-screen w-screen snap-center items-center justify-center">
			<!-- Fullscreen Reel -->
			<div class="relative max-w-[85%] overflow-hidden rounded-2xl lg:h-[85%]">
				<video
					bind:this={video}
					muted
					playsinline
					autoplay
					class="aspect-[3/4.5] h-full w-full object-cover sm:aspect-[3/4] md:aspect-square lg:aspect-[4/3]"
					src={`https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/${replaceSpaces(
						results[currentVideo].properties.Name.title[0].plain_text
					)}${suffix}`}
					on:ended={handleVideoEnded}
					on:canplaythrough={preloadNextVideo}
				>
				</video>
				<div class="absolute left-0 top-0 h-full w-full" on:click={() => video.play()}>
					<div class="absolute left-0 top-0 h-full w-full bg-[var(--dark)] opacity-40"></div>
					<div class="relative flex h-full w-full items-center justify-center">
						<div class="flex flex-col items-center justify-center">
							<!-- <TextLogo /> -->
							<h1
								class="mt-[-.3em] text-[14vw] leading-[1.1em] text-[var(--midLight)] xl:text-[12vw]"
							>
								Anthropotpourri
							</h1>
							<p
								class="hidden text-center text-sm tracking-[.5rem] sm:text-xl md:mt-2 md:block lg:text-2xl"
							>
								The Cinematography of Shorouk Elkobrsi
							</p>
							<p class="text-center text-sm tracking-[.5rem] sm:text-xl md:hidden">
								The Cinematography<br />of Shorouk Elkobrsi
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- Overlay -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
		</div>
		<div
			id="about"
			class="flex min-h-screen w-screen snap-center items-center justify-center bg-[var(--midDark)] py-[25vh]"
		>
			<div class="w-3/4 max-w-[50ch] md:text-2xl lg:w-1/2">
				<h2 class="mb-12"><TextMacro type={aboutHeading} /></h2>
				<div
					class="md:text-2xl [&_a]:font-semibold [&_a]:text-[var(--midLight)] hover:[&_a]:text-[var(--mid)] [&_p]:mb-4 [&_p]:text-[var(--light)]"
				>
					<NotionPageParser results={aboutContent} />
				</div>
			</div>
		</div>
		<div
			id="portfolio"
			class="min-w-screen relative z-10 flex h-screen snap-center items-center justify-center bg-[var(--dark)] px-8 sm:px-28 md:px-32 lg:px-40"
		>
			<div
				class="grid grid-cols-1 grid-rows-6 gap-4 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2"
			>
				{#each videos as video}
					<GalleryVideo {video} {projects} {highQuality} on:changeColor={changeColors} />
				{/each}
			</div>
		</div>
	</div>
{/if}

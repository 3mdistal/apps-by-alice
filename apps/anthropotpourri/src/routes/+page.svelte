<script lang="ts">
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light, homepageOpen } from '$lib/stores';
	import NotionPageParser from '$lib/notion-page-parser.svelte';
	import GalleryVideo from './gallery-video.svelte';
	import { replaceSpaces, createIntersectionObserver } from '$lib/helpers';
	import TextMacro from '$lib/text-macro.svelte';
	import type {
		BlockObjectResponse,
		PageObjectResponse
	} from '@notionhq/client/build/src/api-endpoints';
	import GalleryVideoMobile from './gallery-video-mobile.svelte';
	import { animate } from 'motion';

	// Import Notion Data
	export let data;

	let video: HTMLVideoElement;
	let titleTextDiv: HTMLDivElement;

	let {
		reels: { results },
		streamed: {
			videos: { results: videos },
			projects: { results: projects },
			blurbHeading: { toggle: blurbHeading },
			blurbContent: { results: blurbContent }
		},
		highQuality
	} = data as {
		reels: { results: PageObjectResponse[] };
		streamed: {
			videos: { results: PageObjectResponse[] };
			projects: { results: PageObjectResponse[] };
			blurbContent: { results: BlockObjectResponse[] };
		};
		highQuality: boolean;
	};

	// State Variables
	let currentVideo = 0;

	// Color handling
	function changeColors() {
		if (window.location.pathname === '/') {
			const colors = results[currentVideo].properties.Colors.rich_text[0].plain_text.split(',');
			dark.set(colors[0].trim());
			mid_dark.set(colors[1].trim());
			mid.set(colors[2].trim());
			mid_light.set(colors[3].trim());
			light.set(colors[4].trim());
			document.body.style.backgroundColor = `#${$dark}`;
			document.querySelector('#portfolio').style.backgroundColor = `#${$dark}`;
			document.querySelector('#blurb').style.backgroundColor = `#${$mid_dark}`;
		}
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
			nextVideo.src = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/homepage/reel/${replaceSpaces(
				results[currentVideo + 1].properties.Name.title[0].plain_text
			)}${suffix}`;
		} else {
			nextVideo.src = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/homepage/reel/${replaceSpaces(
				results[0].properties.Name.title[0].plain_text
			)}${suffix}`;
		}
	}

	// Lifecycle
	onMount(() => {
		createIntersectionObserver(video);
		changeColors();
		animate(titleTextDiv, { opacity: [0, 1] }, { duration: 2, delay: 1 });
	});
</script>

<svelte:head>
	<title>Anthropotpourri</title>
	<meta name="title" content="Anthropotpourri" />
	<meta name="description" content="The cinematography portfolio of Shorouk Elkobrsi." />
	<meta name="keywords" content="film, cinematography, production, shorouk, elkobrsi" />
	<meta name="author" content="Shorouk Elkobrsi" />

	<!-- Facebook -->
	<meta property="og:title" content="Anthropotpourri" />
	<meta property="og:site_name" content="Anthropotpourri" />
	<meta property="og:description" content="The cinematography portfolio of Shorouk Elkobrsi." />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://unsplash.it/1600/900" />
	<meta property="og:url" content="https://anthropotpourri.com" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Anthropotpourri" />
	<meta name="twitter:description" content="The cinematography portfolio of Shorouk Elkobrsi." />
	<meta name="twitter:image" content="https://unsplash.it/1600/900" />
	<meta name="twitter:site" content="@shoroukelkobrsi" />
</svelte:head>

{#if $homepageOpen}
	<div class="relative flex h-[100dvh] w-screen items-center justify-center bg-[var(--dark)]">
		<!-- Box Reel -->
		<div
			class="aspect-[3/4.5] max-w-[85%] overflow-hidden rounded-2xl sm:aspect-[3/4] md:aspect-square lg:aspect-[4/3] lg:h-[85%]"
		>
			<video
				bind:this={video}
				muted
				playsinline
				autoplay
				class="h-full w-full object-cover"
				src={`https://ik.imagekit.io/tempoimmaterial/anthropotpourri/homepage/reel/${replaceSpaces(
					results[currentVideo].properties.Name.title[0].plain_text
				)}${suffix}`}
				on:ended={handleVideoEnded}
				on:canplaythrough={preloadNextVideo}
			>
			</video>
			<!-- Overlay -->
			<div class="absolute left-0 top-0 h-full w-full" on:click={() => video.play()}>
				<div class="absolute left-0 top-0 h-full w-full bg-[var(--dark)] opacity-40"></div>
				<div class="relative flex h-full w-full items-center justify-center">
					<div bind:this={titleTextDiv} class="flex flex-col items-center justify-center opacity-0">
						<!-- <TextLogo /> -->
						<h1
							class="text-[14vw] leading-[1em] text-[var(--midLight)] lg:leading-[.9em] xl:text-[12vw]"
						>
							Anthropotpourri
						</h1>
						<p class="hidden text-center text-sm tracking-[.5rem] sm:text-xl md:block lg:text-2xl">
							The Cinematography of Shorouk Elkobrsi
						</p>
						<p class="text-center text-sm tracking-[.5rem] sm:text-xl md:hidden">
							The Cinematography<br />of Shorouk Elkobrsi
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div
		id="blurb"
		class="flex min-h-[100dvh] w-screen items-center justify-center bg-[var(--midDark)]"
	>
		<div class="w-[80%] max-w-[50ch] md:text-2xl">
			<h2 class="mb-6 sm:mb-12"><TextMacro type={blurbHeading} /></h2>
			<div
				class="md:text-2xl [&_a]:font-semibold [&_a]:text-[var(--midLight)] hover:[&_a]:text-[var(--mid)] [&_p]:mb-4 [&_p]:text-[var(--light)]"
			>
				<NotionPageParser results={blurbContent} />
			</div>
		</div>
	</div>
	<div
		id="portfolio"
		class="flex min-h-[100dvh] w-screen items-center justify-center bg-[var(--dark)] px-8 py-[10dvh] sm:px-28 md:px-32 lg:px-40 lg:py-4"
	>
		<div
			class="hidden grid-cols-1 grid-rows-6 gap-4 sm:grid md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2"
		>
			{#each videos as video}
				<GalleryVideo {video} {projects} {highQuality} on:changeColor={changeColors} />
			{/each}
		</div>
		<div class="grid grid-cols-1 grid-rows-6 gap-4 sm:hidden">
			{#each videos as video}
				<GalleryVideoMobile {video} {projects} {highQuality} on:changeColor={changeColors} />
			{/each}
		</div>
	</div>
{/if}

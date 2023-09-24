<script lang="ts">
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	export let data;

	let {
		reels: { results }
	} = data;

	let currentVideo = 0;

	function breakApartColors() {
		const colors = results[currentVideo].properties.Colors.rich_text[0].plain_text.split(',');
		const dark = colors[0].trim();
		const midDark = colors[1].trim();
		const mid = colors[2].trim();
		const midLight = colors[3].trim();
		const light = colors[4].trim();
		return { dark, midDark, mid, midLight, light };
	}

	function changeColors() {
		dark.set(breakApartColors().dark);
		mid_dark.set(breakApartColors().midDark);
		mid.set(breakApartColors().mid);
		mid_light.set(breakApartColors().midLight);
		light.set(breakApartColors().light);
	}

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

	onMount(() => {
		document.body.style.backgroundColor = `#${$dark}`;
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

<div id="home">
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
			<div class="w-3/4">
				<h1 class="mb-2 font-serif text-3xl text-[var(--midLight)] md:text-6xl">
					<span class="italic">anthropotpourri</span> (n)
				</h1>
				<p class="mb-4 text-xl text-[var(--light)]">
					The cintematographic works of Shorouk Elkobrsi.
				</p>
				<p class="text-xl text-[var(--light)]">
					The building of this studio is currently in-progress. To see current work, please visit
					the <a
						class="font-bold text-[var(--midLight)] hover:text-[var(--mid)]"
						href="https://www.instagram.com/anthropotpourri/">Anthropotpourri Instagram</a
					>.
				</p>
			</div>
		</div>
	</div>
</div>

<div id="studio" class="flex min-h-screen w-screen items-center justify-center bg-[var(--dark)]">
	<p class="font-serif text-3xl text-[var(--midLight)] md:text-6xl">studio coming soon...</p>
</div>

<div id="about" class="flex min-h-screen w-screen items-center justify-center bg-[var(--midDark)]">
	<div class="h-[50vh] w-1/2">
		<p class="font-serif text-3xl text-[var(--midLight)] md:text-6xl">about</p>
		<p class="text-[var(--light)]">Anthropotpourri is the portfolio work of Shorouk Elkobrsi...</p>
	</div>
</div>

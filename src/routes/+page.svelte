<script>
	import { onMount } from 'svelte';
	import { dark } from '$lib/stores';

	onMount(() => {
		document.body.style.backgroundColor = `#${$dark}`;
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
		<video autoplay muted loop class="min-h-screen w-screen object-cover">
			<source
				src="https://ik.imagekit.io/tempoimmaterial/anthropotpourri/Reel/dummyreel4.mp4"
				type="video/mp4"
			/>
		</video>
	</div>

	<!-- Overlay -->
	<div class="relative min-h-screen w-screen">
		<div class="absolute h-full w-full bg-[var(--dark)] opacity-70" />
		<div class="relative flex min-h-screen w-full items-center justify-center">
			<div class="w-1/2">
				<h1 class="mb-2 font-serif text-6xl text-[var(--light)]">
					<span class="italic">anthropotpourri</span> (n)
				</h1>
				<p class="text-xl text-[var(--midLight)]">
					The cintematographic works of Shorouk Elkobrsi.
				</p>
			</div>
		</div>
	</div>
</div>

<div id="studio" class="flex min-h-screen w-screen items-center justify-center bg-[var(--dark)]">
	<p class="font-serif text-6xl text-[var(--light)]">studio</p>
</div>

<div id="about" class="flex min-h-screen w-screen items-center justify-center bg-[var(--midDark)]">
	<p class="font-serif text-6xl text-[var(--light)]">about</p>
</div>

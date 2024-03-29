<script lang="ts">
	import Slide from './slide.svelte';
	import { inView } from 'motion';
	import NotionPageParser from '$lib/notion-page-parser.svelte';
	import type {
		BlockObjectResponse,
		PageObjectResponse
	} from '@notionhq/client/build/src/api-endpoints';

	export let data;

	const {
		aboutHeading,
		aboutIntro: { results: aboutIntro },
		streamed: {
			aboutContent: { results: aboutContent },
			logos: { results: logos }
		},
		highQuality
	} = data as {
		aboutHeading: string;
		aboutIntro: { results: BlockObjectResponse[] };
		streamed: {
			aboutContent: { results: PageObjectResponse[] };
			logos: { results: PageObjectResponse[] };
		};
		highQuality: boolean;
	};

	// Slideshow Handling
	let currentSlide = 0;
	let slideShowContainerHeight = aboutContent.length * 100 + 'dvh';

	function changeSlide(div: HTMLDivElement) {
		inView(
			div,
			() => {
				currentSlide = parseInt(div.id);

				return () => {};
			},
			{ margin: '-1%' }
		);
	}

	let heroImage: HTMLImageElement;

	function showHideHeroImage(div: HTMLDivElement) {
		inView(div, () => {
			heroImage.style.opacity = '1';
			return () => {
				heroImage.style.opacity = '0';
			};
		});
	}

	// Image Handling
	const prefix = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/slideshow/`;
	const suffix = highQuality ? `?tr=w-1000,h-1000,fo-auto` : `?tr=w-1000,h-1000,fo-auto,q-10`;
</script>

<svelte:head>
	<title>About - Anthropotpourri</title>
	<meta name="title" content="About - Anthropotpourri" />
	<meta
		name="description"
		content="Learn more about Shorouk Elkobrsi's journey into cinematography."
	/>
	<meta
		name="keywords"
		content="film, cinematography, production, shorouk, elkobrsi, about, journey"
	/>
	<meta name="author" content="Shorouk Elkobrsi" />

	<!-- Facebook -->
	<meta property="og:title" content="About - Anthropotpourri" />
	<meta property="og:site_name" content="Anthropotpourri" />
	<meta property="og:description" content="Learn more about my journey into cinematography." />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://unsplash.it/1600/900" />
	<meta property="og:url" content="https://anthropotpourri.com/about" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About - Anthropotpourri" />
	<meta name="twitter:description" content="Learn more about my journey into cinematography." />
	<meta name="twitter:image" content="https://unsplash.it/1600/900" />
	<meta name="twitter:site" content="@shoroukelkobrsi" />
</svelte:head>

<!-- Hero -->
<div use:showHideHeroImage class="relative h-[100dvh]">
	<img
		bind:this={heroImage}
		src="https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/hero?tr=q-20"
		alt=""
		class="fixed left-0 top-0 -z-10 h-full w-screen object-cover"
	/>
	<div class="absolute left-0 top-0 h-full w-screen bg-black opacity-80"></div>

	<!-- Intro -->
	<div
		class="relative m-auto flex h-full max-w-[90%] flex-col items-center justify-center gap-y-8 pt-8 md:max-w-[80%] md:gap-y-4"
	>
		<h1 class="max-w-[20ch] text-center text-6xl text-[var(--midLight)] md:text-[8rem]">
			{aboutHeading}
		</h1>
		<div
			class="max-w-[90%] opacity-90 [&_p]:mb-4 [&_p]:max-w-[40ch] [&_p]:text-[1rem] [&_p]:leading-snug md:[&_p]:text-2xl md:[&_p]:leading-normal"
		>
			<NotionPageParser results={aboutIntro} />
		</div>
	</div>
</div>

<!-- Slideshow -->

<div class="sticky top-0 -z-10 h-[100dvh] w-full bg-[var(--dark)]">
	{#key currentSlide}
		<Slide
			heading={aboutContent[currentSlide].properties.Heading.title[0].plain_text}
			src={prefix + aboutContent[currentSlide].properties.Image.rich_text[0].plain_text + suffix}
			alt={aboutContent[currentSlide].properties.Alt.rich_text[0].plain_text}
			text={aboutContent[currentSlide].properties.Text.rich_text[0].plain_text}
			colorTheme={aboutContent[currentSlide].properties.Colors.rich_text[0].plain_text}
		/>
	{/key}
</div>

{#each aboutContent as entry, i}
	<div use:changeSlide id={i.toString()} class="relative top-[-100dvh] h-[100dvh] w-screen"></div>
{/each}

<!-- Logo Wall -->
<div
	class="relative flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--midDark)] px-4 py-16 md:gap-y-10 md:py-10"
>
	<h2 class="mb-10 text-center text-[var(--light)]">People who gave me their trust:</h2>
	<div class="grid grid-cols-2 gap-2 md:max-w-[75%] md:grid-cols-4 md:gap-6">
		{#each logos as logo}
			<div
				class="relative rounded-lg border-2 border-[var(--lightx)] bg-[var(--light)] px-10 py-4 transition-all duration-300 hover:border-4 hover:border-[var(--mid)] hover:brightness-[96%] md:rounded-2xl md:border-4 [&_*]:transition-all [&_*]:duration-300 [&_div]:hover:opacity-0 [&_img]:hover:saturate-100"
			>
				<img
					src={`https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/logos/${logo.properties.Name.title[0].plain_text}`}
					alt={logo.properties.Name.title[0].plain_text}
					class="aspect-video h-full w-full object-contain saturate-0"
				/>
				<div
					class="absolute left-0 top-0 h-full w-full rounded-2xl bg-[var(--mid)] opacity-50 mix-blend-lighten"
				></div>
			</div>
		{/each}
	</div>
</div>

<div class="hidden">
	{#each aboutContent as entry}
		<Slide
			heading={aboutContent[currentSlide].properties.Heading.title[0].plain_text}
			src={prefix + aboutContent[currentSlide].properties.Image.rich_text[0].plain_text + suffix}
			alt={aboutContent[currentSlide].properties.Alt.rich_text[0].plain_text}
			text={aboutContent[currentSlide].properties.Text.rich_text[0].plain_text}
		/>
	{/each}
</div>

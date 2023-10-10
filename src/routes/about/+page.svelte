<script lang="ts">
	import Slide from './slide.svelte';
	import { currentScrollContainer } from '$lib/stores';
	import { scroll, type ScrollInfo } from 'motion';
	import { onMount } from 'svelte';
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

	let currentSlide = 0;
	let slideTransition = true;

	const updateSlide = (info: ScrollInfo) => {
		const progress = info.y.progress;
		const newSlide = parseInt((progress * (aboutContent.length - 1)).toFixed(0));

		if (currentSlide !== newSlide && slideTransition) {
			currentSlide = newSlide;
			debouncedManageSlideTransition();
		}
	};

	function manageSlideTransition() {
		slideTransition = !slideTransition;
		setTimeout(() => {
			slideTransition = !slideTransition;
		}, 1000);
	}

	const debouncedManageSlideTransition = debounce(manageSlideTransition, 1000, true);

	function debounce(func: Function, wait: number, immediate: boolean) {
		let timeout: number | undefined;
		return function (this: any, ...args: any[]) {
			let context = this;
			let later = function () {
				timeout = undefined;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = window.setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	function scrollSlideShow(target: HTMLDivElement) {
		scroll((info) => updateSlide(info), {
			container: target
		});
	}

	const prefix = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/slideshow/`;
	const suffix = highQuality ? `?tr=w-1000,h-1000,fo-auto` : `?tr=w-1000,h-1000,fo-auto,q-10`;

	let main: HTMLElement;

	onMount(() => {
		currentScrollContainer.set(main);
	});
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<main
	bind:this={main}
	class="relative h-[100svh] snap-y snap-mandatory overflow-y-auto bg-[var(--dark)] text-[var(--midLight)] [&>*]:snap-start [&>*]:snap-always"
>
	<!-- Hero -->
	<div>
		<img
			src="https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/hero?tr=q-20"
			alt=""
			class="absolute left-0 top-0 h-[100svh] w-screen object-cover"
		/>
		<div class="absolute left-0 top-0 h-[100svh] w-screen bg-black opacity-80"></div>

		<!-- Intro -->
		<div
			class="relative m-auto flex h-[100svh] max-w-[90%] flex-col items-center justify-center gap-y-8 pt-8 md:max-w-[80%] md:gap-y-4"
		>
			<h1 class="max-w-[20ch] text-center text-6xl md:text-[8rem]">
				{aboutHeading}
			</h1>
			<div
				class="max-w-[90%] opacity-90 [&_p]:mb-4 [&_p]:max-w-[40ch] [&_p]:text-[1rem] [&_p]:leading-snug [&_p]:tracking-widest md:[&_p]:text-2xl md:[&_p]:leading-normal"
			>
				<NotionPageParser results={aboutIntro} />
			</div>
		</div>
	</div>

	<!-- Slideshow -->
	<div
		use:scrollSlideShow
		class="relative h-[100svh] snap-y snap-mandatory overflow-y-auto bg-[var(--dark)] [&>*]:snap-start [&>*]:snap-always"
	>
		<div class="sticky top-0 h-full">
			{#key currentSlide}
				<Slide
					heading={aboutContent[currentSlide].properties.Heading.title[0].plain_text}
					src={prefix +
						aboutContent[currentSlide].properties.Image.rich_text[0].plain_text +
						suffix}
					alt={aboutContent[currentSlide].properties.Alt.rich_text[0].plain_text}
					text={aboutContent[currentSlide].properties.Text.rich_text[0].plain_text}
					colorTheme={aboutContent[currentSlide].properties.Colors.rich_text[0].plain_text}
				/>
			{/key}
		</div>
		<!-- Spacers -->
		<div id="0" class="absolute top-0 h-[100svh] w-full"></div>
		{#each aboutContent as entry, i}
			{#if i !== 0}
				<div id={i.toString()} class="h-[100svh] w-full"></div>
			{/if}
		{/each}
	</div>

	<!-- Logo Wall -->
	<div
		class="relative flex min-h-[100svh] flex-col items-center justify-center bg-[var(--midDark)] px-4 py-16 md:gap-y-10 md:py-10"
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
</main>

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

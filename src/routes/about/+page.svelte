<script lang="ts">
	import Slide from './slide.svelte';
	import { light, mid_light, mid, mid_dark, dark, currentScrollContainer } from '$lib/stores';
	import { animate, scroll, type ScrollInfo } from 'motion';
	import { onMount } from 'svelte';

	export let data;

	const {
		aboutContent: { results: slideContent },
		logos: { results: logos }
	} = data;

	let currentSlide = 0;
	let slideTransition = true;

	const updateSlide = (info: ScrollInfo) => {
		const progress = info.y.progress;
		const newSlide = parseInt((progress * (slideContent.length - 1)).toFixed(0));

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

	function debounce(func, wait: number, immediate: boolean) {
		let timeout;
		return function () {
			let context = this,
				args = arguments;
			let later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	function scrollSlideShow(target: HTMLDivElement) {
		scroll((info) => updateSlide(info), {
			container: target
		});
	}

	function titleIn(target: HTMLHeadingElement) {
		animate(target, { x: [500, 300, 200, 200, 50, 25] }, { duration: 0.5 });
	}

	// Color handling
	function changeColors(logo) {
		const colors = logo.properties.Colors.rich_text[0].plain_text.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
	}

	const prefix = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/slideshow/`;
	const suffix = `?tr=w-1000,h-1000,fo-auto`;

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
	class="h-[100svh] snap-y snap-mandatory overflow-y-scroll bg-[var(--dark)] text-[var(--midLight)] [&>*]:snap-start [&>*]:snap-always"
>
	<!-- Intro -->
	<div class="m-auto flex h-[100svh] max-w-[80%] flex-col items-center justify-center gap-y-4">
		<h1 use:titleIn class="text-[8rem]">Shorouk <br /> Elkobrsi</h1>
		<!-- todo: Make dynamic ethos text. -->
		<p use:titleIn class="max-w-[40ch] text-3xl">
			Ethos: Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente
			laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio
			voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?
		</p>
	</div>

	<!-- Slideshow -->
	<div
		use:scrollSlideShow
		class="relative h-[100svh] snap-y snap-mandatory overflow-scroll [&>*]:snap-start [&>*]:snap-always"
	>
		<div class="sticky top-0 h-full">
			{#key currentSlide}
				<Slide
					heading={slideContent[currentSlide].properties.Heading.title[0].plain_text}
					src={prefix +
						slideContent[currentSlide].properties.Image.rich_text[0].plain_text +
						suffix}
					alt={slideContent[currentSlide].properties.Alt.rich_text[0].plain_text}
					text={slideContent[currentSlide].properties.Text.rich_text[0].plain_text}
				/>
			{/key}
		</div>

		<div id="0" class="absolute top-0 h-[100svh] w-full"></div>
		{#each slideContent as entry, i}
			{#if i !== 0}
				<div id={i.toString()} class="h-[100svh] w-full"></div>
			{/if}
		{/each}
	</div>

	<!-- Logo Wall -->
	<div class="flex min-h-[100svh] flex-col items-center justify-center gap-y-10 bg-slate-600 py-10">
		<h2 class="mb-10 text-[var(--light)]">People who gave me their trust:</h2>
		<!-- todo: put wall here -->
		<div class="grid max-w-[75%] grid-cols-4 gap-6">
			{#each logos as logo}
				<div
					on:mouseenter={() => changeColors(logo)}
					class="relative rounded-2xl border-4 border-slate-300 bg-slate-300 px-10 py-4 hover:border-4 hover:border-[var(--mid)] hover:brightness-[96%] [&_*]:transition-all [&_*]:duration-200 [&_div]:hover:opacity-0 [&_img]:hover:saturate-100"
				>
					<img
						src={`https://ik.imagekit.io/tempoimmaterial/anthropotpourri/about/logos/${logo.properties.Name.title[0].plain_text}`}
						alt={logo.properties.Name.title[0].plain_text}
						class="aspect-video h-full w-full object-contain saturate-0"
					/>
					<div
						class="absolute left-0 top-0 h-full w-full rounded-2xl bg-slate-500 opacity-50 mix-blend-lighten"
					></div>
				</div>
			{/each}
		</div>
	</div>
</main>

<div class="hidden">
	{#each slideContent as entry}
		<Slide
			heading={slideContent[currentSlide].properties.Heading.title[0].plain_text}
			src={prefix + slideContent[currentSlide].properties.Image.rich_text[0].plain_text + suffix}
			alt={slideContent[currentSlide].properties.Alt.rich_text[0].plain_text}
			text={slideContent[currentSlide].properties.Text.rich_text[0].plain_text}
		/>
	{/each}
</div>

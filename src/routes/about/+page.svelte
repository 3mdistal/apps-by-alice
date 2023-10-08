<script lang="ts">
	import { onMount } from 'svelte';
	import Slide from './slide.svelte';
	import { light, mid_light, mid, mid_dark, dark } from '$lib/stores';

	export let data;

	const { results: logos } = data.logos;

	const entries = [
		{
			heading: 'My name is Shorouk',
			imgSrc: 'https://unsplash.it/1200/1200',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		},
		{
			heading: 'This is my about page',
			imgSrc: 'https://unsplash.it/1500/1500',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		},
		{
			heading: 'You learned about me',
			imgSrc: 'https://unsplash.it/1100/1100',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		},
		{
			heading: 'Because I am the best',
			imgSrc: 'https://unsplash.it/1300/1300',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		}
	];

	let currentSlide = 0;
	let showSlide = 0; // intermediate state
	let scrollLock = 0;

	onMount(() => {
		console.log(logos);
	});

	const changeSlide = (e: WheelEvent) => {
		const direction = e.deltaY > 0 ? 1 : -1;

		currentSlide += direction;

		if (currentSlide < 0) currentSlide = 0;
		if (currentSlide > entries.length - 1) currentSlide = entries.length - 1;

		showSlide = currentSlide;

		setTimeout(() => {
			scrollLock = currentSlide;
		}, 2000);
	};

	function throttle(func: Function, delay: number) {
		let lastCall = 0;
		return (...args: any[]) => {
			const now = new Date().getTime();
			if (now - lastCall < delay) {
				return;
			}
			lastCall = now;
			return func(...args);
		};
	}

	function handleScroll(e: WheelEvent) {
		if (Math.abs(e.deltaY) < 10) {
			e.preventDefault();
		}

		const direction = e.deltaY > 0 ? 1 : -1;
		if ((direction > 0 && scrollLock < entries.length - 1) || (direction < 0 && scrollLock > 0)) {
			e.preventDefault();
		}
	}

	const throttledChangeSlide = throttle(changeSlide, 1250);

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
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<main
	class="h-[100svh] snap-y snap-mandatory overflow-y-scroll bg-[var(--dark)] text-[var(--midLight)] [&>*]:snap-start [&>*]:snap-always"
>
	<!-- Intro -->
	<div class="flex h-[100svh] max-w-[90%] flex-col items-center justify-center gap-y-4">
		<h1 class="text-8xl">Shorouk <br /> Elkobrsi</h1>
		<!-- todo: Make dynamic ethos text. -->
		<p class="max-w-[40ch]">
			Ethos: Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente
			laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio
			voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?
		</p>
	</div>

	<!-- Slideshow -->
	<div class="h-[100svh] overflow-hidden" on:wheel={throttledChangeSlide} on:wheel={handleScroll}>
		{#key showSlide}
			<Slide
				heading={entries[showSlide].heading}
				src={entries[showSlide].imgSrc}
				alt={entries[showSlide].imgAlt}
				text={entries[showSlide].text}
			/>
		{/key}
	</div>

	<!-- Logo Wall -->
	<div
		class="bg- flex min-h-[100svh] flex-col items-center justify-center gap-y-10 bg-slate-600 py-10"
	>
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
	{#each entries as entry}
		<img src={entry.imgSrc} alt="" />
	{/each}
</div>

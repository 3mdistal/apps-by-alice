<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	export let studioGalleryResult;

	let {
		properties: {
			Colors: {
				rich_text: [{ plain_text: colorList }]
			},
			Cover: {
				rich_text: [{ plain_text: cover }]
			},
			Date: {
				rich_text: [{ plain_text: date }]
			},
			Logline: {
				rich_text: [{ plain_text: logline }]
			},
			Name: {
				title: [{ plain_text: name }]
			},
			Root: {
				rich_text: [{ plain_text: root }]
			}
		}
	} = studioGalleryResult;

	let imageSrc =
		'https://ik.imagekit.io/tempoimmaterial/anthropotpourri/studio/' +
		replaceSpaces(root) +
		'/' +
		replaceSpaces(cover) +
		'?tr=w-1000';

	console.log(imageSrc);

	function changeColors() {
		const colors = colorList.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
		document.querySelector('#studio').style.backgroundColor = `#${$mid_dark}`;
		document.querySelector('#about').style.backgroundColor = `#${$dark}`;
	}

	const dispatch = createEventDispatcher();

	function sayChangeColor() {
		dispatch('changeColor');
	}
</script>

<div class="w-full items-center justify-around rounded-2xl md:flex">
	<div
		class="peer aspect-square overflow-hidden rounded-2xl border-2 border-[#aaaaaa] hover:border-[var(--midLight)] md:max-w-[60%] [&_img]:hover:scale-[105%] [&_img]:hover:saturate-[125%]"
		on:mouseenter={changeColors}
		on:mouseleave={sayChangeColor}
	>
		<img src={imageSrc} class="h-full w-full object-cover saturate-0" alt="" />
	</div>
	<div class="mt-12 sm:w-3/4 md:mt-0 md:max-w-[35%] [&_*]:peer-hover:opacity-100">
		<h2 class="font-serif text-2xl text-[var(--midLight)] opacity-0 md:mb-4 md:text-8xl">
			{name}
		</h2>
		<p class="text-lg font-thin italic text-[var(--light)] opacity-0 md:mb-2 md:text-xl">
			{date}
		</p>
		<p class="text-xl font-light text-[var(--light)] opacity-0 md:text-2xl">{logline}</p>
	</div>
</div>

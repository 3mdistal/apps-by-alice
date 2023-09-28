<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	export let video;
	export let highQuality;

	let {
		properties: {
			Colors: {
				rich_text: [{ plain_text: colorList }]
			},
			Name: {
				title: [{ plain_text: name }]
			},
			Alt: {
				rich_text: [{ plain_text: alt }]
			}
		}
	} = video;

	const root = 'Fish on Shore';
	let vid: HTMLVideoElement;

	const suffix = highQuality ? '?tr=ac-none,q-50' : '?tr=ac-none,q-10';

	const videoSrc =
		'https://ik.imagekit.io/tempoimmaterial/anthropotpourri/studio/' +
		replaceSpaces(root, true) +
		'/' +
		replaceSpaces(name, true) +
		suffix;

	const href = `/${replaceSpaces(root, false)}`;

	function changeColors() {
		const colors = colorList.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
		document.querySelector('#portfolio').style.backgroundColor = `#${$mid_dark}`;
		document.querySelector('#about').style.backgroundColor = `#${$dark}`;
	}

	function playBackwards(video: HTMLVideoElement) {
		const playback = setInterval(function () {
			if (video.currentTime <= 0) {
				video.pause();
			} else {
				video.currentTime -= 0.2;
			}
		}, 42);

		setTimeout(() => {
			clearInterval(playback);
			video.pause();
		}, 700);
	}

	function handleMouseEnter() {
		changeColors();
		vid.play();
	}

	function handleMouseLeave() {
		playBackwards(vid);
		sayChangeColor();
	}

	const dispatch = createEventDispatcher();

	function sayChangeColor() {
		dispatch('changeColor');
	}
</script>

<a
	class="peer relative aspect-square overflow-hidden rounded-2xl hover:scale-105 hover:drop-shadow-lg focus:scale-105 focus:drop-shadow-lg [&_video]:hover:scale-[100%] [&_video]:hover:saturate-[125%] [&_video]:focus:scale-[100%] [&_video]:focus:saturate-[125%]"
	{href}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:focus={handleMouseEnter}
	on:blur={handleMouseLeave}
>
	<video
		bind:this={vid}
		muted
		src={videoSrc}
		class="h-full w-full scale-[110%] object-cover saturate-0"
		alt={alt ? alt : name}
	/>
	<div class="absolute top-0 h-full w-full bg-[var(--midDark)] opacity-20 hover:opacity-0"></div>
</a>

<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { inView } from 'motion';
	import { createEventDispatcher, onMount } from 'svelte';

	export let video;
	export let projects;
	export let highQuality;

	const {
		properties: {
			Colors: {
				rich_text: [{ plain_text: colorList }]
			},
			Name: {
				title: [{ plain_text: name }]
			},
			Alt: {
				rich_text: [{ plain_text: alt }]
			},
			Project: {
				relation: [{ id: parentProjectID }]
			},
			Fallback: {
				rich_text: [{ plain_text: fallbackPoster }]
			}
		}
	} = video;

	// Parent Project Properties
	function filterProjects(projectList) {
		return projectList.filter((project) => project.id === parentProjectID);
	}

	const parentProjectTitle = filterProjects(projects)[0].properties.Name.title[0].plain_text;

	// Link to Parent Project
	const href = `/films/${replaceSpaces(parentProjectTitle, false)}`;

	// Video Source
	const suffix = highQuality ? '?tr=ac-none,q-50' : '?tr=ac-none,q-10';

	const videoSrc =
		'https://ik.imagekit.io/tempoimmaterial/anthropotpourri/films/' +
		replaceSpaces(parentProjectTitle, true) +
		'/' +
		replaceSpaces(name, true) +
		suffix;

	const posterSrc =
		'https://ik.imagekit.io/tempoimmaterial/anthropotpourri/films/' +
		replaceSpaces(parentProjectTitle, true) +
		'/' +
		replaceSpaces(fallbackPoster, true);

	// Video Player
	let vid: HTMLVideoElement;
	let cover: HTMLDivElement;

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
		}, 500);
	}

	// Local Color Changes
	function changeColors() {
		const colors = colorList.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
		document.querySelector('#portfolio').style.backgroundColor = `#${$mid_dark}`;
		document.querySelector('#blurb').style.backgroundColor = `#${$dark}`;
	}

	// Handlers
	function handleEnterView() {
		cover.style.opacity = '0';
		vid.style.filter = 'saturate(1)';
		changeColors();
		vid.play();

		return () => handleExitView();
	}

	function handleExitView() {
		cover.style.opacity = '20%';
		vid.style.filter = 'saturate(0)';
		playBackwards(vid);
		sayChangeColor();
	}

	// Dispatchers
	const dispatch = createEventDispatcher();

	function sayChangeColor() {
		dispatch('changeColor');
	}

	onMount(() => {
		inView(vid, () => handleEnterView(), { amount: 'all' });
	});
</script>

<a class="relative aspect-square overflow-hidden rounded-2xl" {href}>
	<video
		bind:this={vid}
		muted
		playsinline
		src={videoSrc}
		class="h-full w-full object-cover saturate-0"
		alt={alt ? alt : name}
		poster={posterSrc}
	/>
	<div bind:this={cover} class="absolute top-0 h-full w-full bg-[var(--midDark)] opacity-20"></div>
</a>

<style>
	* {
		transition: all 0.5s ease-in-out;
	}
</style>

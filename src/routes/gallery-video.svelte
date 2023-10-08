<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

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
			}
		}
	} = video;

	// Parent Project Properties
	function filterProjects(projectList) {
		return projectList.filter((project) => project.id === parentProjectID);
	}

	const parentProjectTitle = filterProjects(projects)[0].properties.Name.title[0].plain_text;

	// Link to Parent Project
	const href = `/${replaceSpaces(parentProjectTitle, false)}`;

	// Video Source
	const suffix = highQuality ? '?tr=ac-none,q-50' : '?tr=ac-none,q-10';

	const videoSrc =
		'https://ik.imagekit.io/tempoimmaterial/anthropotpourri/studio/' +
		replaceSpaces(parentProjectTitle, true) +
		'/' +
		replaceSpaces(name, true) +
		suffix;

	// Video Player
	let vid: HTMLVideoElement;

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
		document.querySelector('#about').style.backgroundColor = `#${$dark}`;
	}

	// Handlers
	function handleMouseEnter() {
		changeColors();
		vid.play();
	}

	function handleMouseLeave() {
		playBackwards(vid);
		sayChangeColor();
	}

	// Dispatchers
	const dispatch = createEventDispatcher();

	function sayChangeColor() {
		dispatch('changeColor');
	}
</script>

<a
	class="peer relative aspect-square overflow-hidden rounded-2xl sm:hover:scale-105 sm:hover:drop-shadow-lg sm:focus:scale-105 sm:focus:drop-shadow-lg sm:[&_video]:hover:scale-[100%] sm:[&_video]:hover:saturate-[120%] sm:[&_video]:focus:scale-[100%] sm:[&_video]:focus:saturate-[125%]"
	{href}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:focus={handleMouseEnter}
	on:blur={handleMouseLeave}
>
	<video
		bind:this={vid}
		muted
		playsinline
		src={videoSrc}
		class="h-full w-full object-cover sm:scale-[110%] sm:saturate-0"
		alt={alt ? alt : name}
	/>
	<div
		class="absolute top-0 hidden h-full w-full bg-[var(--midDark)] hover:opacity-0 sm:block sm:opacity-20"
	></div>
</a>

<style>
	* {
		transition: all 0.5s ease-in-out;
	}
</style>

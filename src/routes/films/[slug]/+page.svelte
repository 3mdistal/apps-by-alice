<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { onMount } from 'svelte';
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';

	export let data;

	let {
		parent: { parentProject: parent, stills }
	} = data;

	const name = parent.properties.Name.title[0].plain_text;
	const logline = parent.properties.Logline.rich_text[0].plain_text;
	const date = parent.properties.Date.rich_text[0].plain_text;

	const imageKit = `https://ik.imagekit.io/tempoimmaterial/anthropotpourri/studio/`;
	const suffix = `?tr=w-1000`;

	function changeColors() {
		const colors = parent.properties.Colors.rich_text[0].plain_text.split(',');
		dark.set(colors[0].trim());
		mid_dark.set(colors[1].trim());
		mid.set(colors[2].trim());
		mid_light.set(colors[3].trim());
		light.set(colors[4].trim());
		document.body.style.backgroundColor = `#${$dark}`;
	}

	onMount(() => {
		changeColors();
	});
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div
	class="flex min-h-screen w-screen flex-col items-center justify-center gap-y-8 bg-[var(--dark)] px-32 py-32"
>
	<div>
		<h1 class="text-8xl text-[var(--midLight)]">{name}</h1>
		<p class="text-center text-[1.1rem] italic">{date}</p>
	</div>
	<div class="aspect-video w-full overflow-hidden rounded-2xl">
		<iframe
			src={`https://player.vimeo.com/video/${parent.properties.Trailer.rich_text[0].plain_text}`}
			title="vimeo-player"
			height="100%"
			width="100%"
			frameborder="0"
			allowfullscreen
		></iframe>
	</div>
	<p>{logline}</p>
	<div class="grid grid-cols-3 grid-rows-2 gap-4">
		{#each stills as still}
			<img
				src={imageKit +
					replaceSpaces(name) +
					'/' +
					still.properties.Name.title[0].plain_text +
					suffix}
				alt=""
				class="rounded-2xl object-cover"
			/>
		{/each}
	</div>
</div>

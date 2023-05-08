<script lang="ts">
	import Bird from '$images/blog/bird.webp';
	import Blog from '$lib/subpages/blog.svelte';
	import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { state } from '$lib/stores';

	export let data: { post: QueryDatabaseResponse };

	const accent = '#d1dce7';
	const background = '#838391';

	function fadeIn() {
		gsap.to('.opacity-0', {
			duration: 1,
			opacity: 1,
			ease: 'power2.inOut'
		});
	}

	onMount(() => {
		fadeIn();
	});

	onDestroy(() => {
		state.set('home');
	});
</script>

<svelte:head>
	<title>Blog</title>
	<meta
		name="description"
		content="Blog entries and writing that doesn't quite fit anywhere else, from Alice Alexandra Moore."
	/>
</svelte:head>

<div
	class="opacity-0 h-[100svh] flex items-stretch sm:items-center justify-center"
	style="background-color: {background}"
>
	<div class="justify-center flex w-full h-full fixed opacity-10">
		<img
			src={Bird}
			alt="A painting of a colorful bird in flight."
			class="object-right md:object-[50%_35%]"
		/>
	</div>
	<div class="w-[90%] py-20 md:w-[60%] relative z-[10]">
		<Blog {accent} {data} />
	</div>
</div>

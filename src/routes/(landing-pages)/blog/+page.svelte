<script lang="ts">
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

<div class="opacity-0">
	<div class="absolute z-20 flex w-full items-center justify-center py-20">
		<div class="relative w-[90%] md:w-[60%] lg:left-10">
			<Blog {accent} {data} />
		</div>
	</div>
	<div class="fixed h-full w-full">
		<div>
			<enhanced:img
				src="$images/blog/bird.webp"
				alt="A painting of a colorful bird in flight."
				sizes="min(1280px, 100vw)"
				class="absolute z-10 object-right opacity-10 md:object-[50%_35%]"
			/>
		</div>
		<div
			class="absolute inset-0 h-full w-full opacity-100"
			style="background-color: {background}"
		/>
	</div>
</div>

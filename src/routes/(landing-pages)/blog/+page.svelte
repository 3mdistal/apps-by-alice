<script lang="ts">
	import Bird from '$images/blog/bird.webp';
	import Blog from '$lib/subpages/blog.svelte';
	import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	export let data: { post: QueryDatabaseResponse };

	const accent = '#d1dce7';
	const background = '#838391';

	function fadeIn() {
		gsap.to('.opacity-0', {
			delay: 0.25,
			duration: 1,
			opacity: 1,
			ease: 'power2.inOut'
		});
	}

	onMount(() => {
		fadeIn();
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
	class="opacity-0 min-h-[100vh] flex items-center justify-center"
	style="background-color: {background}"
>
	<div class="justify-center flex w-full h-full fixed opacity-10">
		<img
			src={Bird}
			alt="A painting of a colorful bird in flight."
			class="object-right md:object-[50%_35%]"
		/>
	</div>
	<div class="w-[90%] py-20 md:w-[60%]">
		<Blog {accent} {data} />
	</div>
</div>

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
	<div class="blog-content">
		<div class="blog-wrapper">
			<Blog {accent} {data} />
		</div>
	</div>
	<div class="background-container">
		<div>
			<enhanced:img
				src="../../cms/images/blog/bird.webp"
				alt="A painting of a colorful bird in flight."
				class="background-image"
			/>
		</div>
		<div class="background-overlay" style="background-color: {background}"></div>
	</div>
</div>

<style>
	.opacity-0 {
		opacity: 0;
	}

	.blog-content {
		position: absolute;
		z-index: 20;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding-top: 5rem;
		padding-bottom: 5rem;
	}

	.blog-wrapper {
		position: relative;
		width: 90%;
	}

	.background-container {
		position: fixed;
		height: 100%;
		width: 100%;
	}

	.background-image {
		position: absolute;
		z-index: 10;
		object-position: right;
		opacity: 0.1;
	}

	.background-overlay {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		opacity: 1;
	}

	@media (min-width: 768px) {
		.blog-wrapper {
			width: 60%;
			left: 2.5rem;
		}

		.background-image {
			object-position: 50% 35%;
		}
	}
</style>

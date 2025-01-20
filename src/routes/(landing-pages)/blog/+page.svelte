<script lang="ts">
	import Blog from '$lib/subpages/blog.svelte';
	import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { state } from '$lib/stores';
	import Bird from '../../../cms/images/blog/bird.webp?enhanced';

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
				src={Bird}
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
		display: flex;
		position: absolute;
		justify-content: center;
		align-items: center;
		z-index: 20;
		padding-top: 5rem;
		padding-bottom: 5rem;
		width: 100%;
	}

	.blog-wrapper {
		position: relative;
		width: 90%;
	}

	.background-container {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.background-image {
		position: absolute;
		opacity: 0.1;
		z-index: 10;
		object-position: right;
	}

	.background-overlay {
		position: absolute;
		opacity: 1;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	@media (min-width: 768px) {
		.blog-wrapper {
			left: 2.5rem;
			width: 60%;
		}

		.background-image {
			object-position: 50% 35%;
		}
	}
</style>

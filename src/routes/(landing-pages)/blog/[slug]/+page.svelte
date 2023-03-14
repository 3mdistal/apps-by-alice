<script lang="ts">
	import NotionPageParser from '$lib/notion/notion-page-parser.svelte';
	import { fade } from 'svelte/transition';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import { currentBlog } from '$lib/stores';
	import type {
		BlockObjectResponse,
		PageObjectResponse
	} from '@notionhq/client/build/src/api-endpoints';
	import { onMount } from 'svelte';

	export let data: {
		post: [{ results: [PageObjectResponse] }, { results: [BlockObjectResponse] }];
	};

	let {
		post: [
			{
				results: [
					{
						properties: {
							Name: {
								title: [
									{
										text: { content: title }
									}
								]
							},
							Subtitle: subtitle,
							Summary: summary
						}
					}
				]
			},
			{ results: content }
		]
	} = data;

	if (content) {
		currentBlog.set(content);
	}

	const logRest = async () => {
		const res = await data.nested.restOfContent;
		if (!res) return;
		const arr = [...content, ...res.results];
		currentBlog.set(arr);
	};

	onMount(() => {
		fetch(window.location.href, {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
		logRest();
	});
</script>

<div class="blog-container" in:fade={{ duration: 500 }}>
	<h1>
		{title}
	</h1>
	<p class="subtitle">
		<TextMacro type={subtitle} />
	</p>
	<hr />
	<p class="summary">
		<em>tl;dr</em>
		<TextMacro type={summary} />
	</p>
	<hr />
	<div class="notion-container">
		<NotionPageParser />
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/blog" data-sveltekit-noscroll class="inline-block p-6  text-gray-900 dark:text-white"
			>back.</a
		>
	</p>
</div>

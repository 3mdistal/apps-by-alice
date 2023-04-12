<script lang="ts">
	import NotionPageParser from '$lib/notion/notion-page-parser.svelte';
	import { fade } from 'svelte/transition';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import { currentBlog } from '$lib/stores';
	import type {
		BlockObjectResponse,
		ListBlockChildrenResponse,
		QueryDatabaseResponse
	} from '@notionhq/client/build/src/api-endpoints';
	import { onMount } from 'svelte';

	export let data: {
		post: [QueryDatabaseResponse, ListBlockChildrenResponse];
		nested: { restOfContent: ListBlockChildrenResponse };
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
							Summary: summary,
							OGDescription: ogDescription
						}
					}
				]
			},
			{ results: content }
		]
	} = data;

	if (content) {
		currentBlog.set(content as [BlockObjectResponse]);
	}

	const logRest = async () => {
		const res = await data.nested.restOfContent;
		if (!res) return;
		const arr: Array<BlockObjectResponse> = [
			...(content as [BlockObjectResponse]),
			...(res.results as [BlockObjectResponse])
		];
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

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={ogDescription.rich_text[0].plain_text} />
</svelte:head>

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
		<NotionPageParser results={content} />
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/blog" data-sveltekit-noscroll class="inline-block p-6 text-gray-900 dark:text-white"
			>back.</a
		>
	</p>
</div>

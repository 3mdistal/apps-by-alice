<script lang="ts">
	import NotionPageParser from '$lib/notion/notion-page-parser.svelte';
	import { fade } from 'svelte/transition';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import DarkCodeTheme from 'svelte-highlight/styles/agate';
	import LightCodeTheme from 'svelte-highlight/styles/a11y-light';
	import type {
		ListBlockChildrenResponse,
		QueryDatabaseResponse
	} from '@notionhq/client/build/src/api-endpoints';
	import { onMount, tick } from 'svelte';
	import { subAndSuper, wrapLists, createTOC } from '$lib/notion/blog-helpers';
	import mermaid from 'mermaid';
	let config = { startOnLoad: true };

	let darkMode: boolean;

	function setDarkMode() {
		darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	const runBlogHelpers = async () => {
		await tick();
		subAndSuper(context);
		wrapLists(context);
		createTOC();
		setDarkMode();
		mermaid.initialize(config);
		mermaid.contentLoaded();
	};

	export let data: {
		post: [QueryDatabaseResponse, ListBlockChildrenResponse];
	};

	let context: HTMLDivElement;

	let {
		post: [
			{
				results: [
					{
						properties: {
							Name: {
								title = [
									{
										text: { content: '' }
									}
								]
							},
							Subtitle: subtitle = { rich_text: [{ text: { content: '' } }] },
							Summary: summary = { rich_text: [{ text: { content: '' } }] },
							OGDescription: ogDescription = '',
							ReadTime: {
								formula: { string: readingTime = '' }
							},
							Category: {
								select: { name: category = '' }
							}
						},
						cover: {
							external: { url: coverURL = '' }
						}
					}
				]
			},
			{ results: content }
		]
	} = data;

	let articleTitle = '';

	if (title[0] && title[0].text && title[0].text.content) {
		articleTitle = title[0].text.content;
	}

	onMount(() => {
		runBlogHelpers();
		fetch(window.location.href, {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});
</script>

<svelte:head>
	<title>{articleTitle}</title>
	<meta name="og:title" content={articleTitle} />
	<meta name="description" content={ogDescription.rich_text[0].plain_text} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com/blog" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog - Tempo Immaterial" />
	<meta property="og:description" content={ogDescription.rich_text[0].plain_text} />
	<meta property="og:image" content={coverURL} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/blog" />
	<meta name="twitter:title" content="Blog - Tempo Immaterial" />
	<meta name="twitter:description" content={ogDescription.rich_text[0].plain_text} />
	<meta name="twitter:image" content={coverURL} />
	<meta
		name="twitter:image:alt"
		content="Open graph representation of this blog article, {articleTitle}."
	/>

	{#if darkMode}
		{@html DarkCodeTheme}
	{:else}
		{@html LightCodeTheme}
	{/if}
</svelte:head>

<div class="blog-container" in:fade={{ duration: 500 }}>
	<h1>
		{articleTitle}
	</h1>
	<p class="subtitle">
		<TextMacro type={subtitle} />
	</p>
	<hr />
	<p class="summary mb-4">
		<em>type</em>
		<span>{category}</span>
	</p>
	<p class="summary mb-4">
		<em>time</em>
		<span
			>{#if readingTime !== '1 minutes'}
				{readingTime}
			{:else}
				1 minute
			{/if}</span
		>
	</p>
	<p class="summary">
		<em>tl;dr</em>
		<span>
			<TextMacro type={summary} />
		</span>
	</p>
	<hr />
	<div class="notion-container" bind:this={context}>
		<NotionPageParser results={content} />
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/blog" data-sveltekit-noscroll class="inline-block p-6 text-gray-900 dark:text-white"
			>back.</a
		>
	</p>
</div>

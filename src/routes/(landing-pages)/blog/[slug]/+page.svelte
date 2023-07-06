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
	<meta property="og:title" content="Blog - {articleTitle}" />
	<meta property="og:description" content={ogDescription.rich_text[0].plain_text} />
	<meta property="og:image" content={coverURL} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/blog" />
	<meta name="twitter:title" content="Blog - {articleTitle}" />
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

<div
	class="blog-container h-full min-h-[100vh] w-full bg-gray-200 px-4 py-16 tracking-wide text-gray-900 dark:bg-black dark:text-white sm:px-10 sm:py-10 [&_sub]:text-inherit [&_sup]:text-inherit"
	in:fade={{ duration: 500 }}
>
	<h1 class="text-4xl dark:text-white sm:text-5xl md:mb-4 md:text-6xl lg:text-7xl">
		{articleTitle}
	</h1>
	<p
		class="mb-[1em] max-w-[45ch] text-xl text-gray-700 dark:text-gray-100 md:text-2xl md:leading-9"
	>
		<TextMacro type={subtitle} />
	</p>
	<hr class="mx-10 my-10 border-black opacity-50 dark:border-white" />
	<p class="mb-4 flex max-w-[45ch]">
		<em class="block w-[5ch] font-medium text-gray-900 dark:text-white">type</em>
		<span class="block w-[35ch] text-gray-700 dark:text-gray-100">{category}</span>
	</p>
	<p class="mb-4 flex max-w-[45ch]">
		<em class="block w-[5ch] font-medium text-gray-900 dark:text-white">time</em>
		<span class="block w-[35ch] text-gray-700 dark:text-gray-100"
			>{#if readingTime !== '1 minutes'}
				{readingTime}
			{:else}
				1 minute
			{/if}</span
		>
	</p>
	<p class="flex max-w-[45ch]">
		<em class="block w-[5ch] font-medium text-gray-900 dark:text-white">tl;dr</em>
		<span class="block w-[35ch] text-gray-700 dark:text-gray-100">
			<TextMacro type={summary} />
		</span>
	</p>
	<hr class="mx-10 my-10 border-black opacity-50 dark:border-white" />
	<div class="notion-container max-w-[60ch] text-xl lg:text-2xl [&_p]:mb-[1em]" bind:this={context}>
		<NotionPageParser results={content} />
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/blog" data-sveltekit-noscroll class="inline-block p-6 text-gray-900 dark:text-white"
			>back.</a
		>
	</p>
</div>

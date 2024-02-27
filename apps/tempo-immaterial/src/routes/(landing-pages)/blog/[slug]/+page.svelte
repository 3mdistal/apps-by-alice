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
							},
							Slug: { url = '' }
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
	<title>{articleTitle ?? 'Blog'}</title>
	<meta name="og:title" content={articleTitle ?? 'Blog'} />
	<meta name="description" content={ogDescription.rich_text[0].plain_text ?? ''} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com/blog/{url}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog - {articleTitle ?? 'Blog'}" />
	<meta property="og:description" content={ogDescription.rich_text[0].plain_text ?? ''} />
	<meta property="og:image" content={coverURL ?? 'https://unsplash.it/1200/600'} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/blog" />
	<meta name="twitter:title" content="Blog - {articleTitle ?? 'Blog'}" />
	<meta name="twitter:description" content={ogDescription.rich_text[0].plain_text ?? ''} />
	<meta name="twitter:image" content={coverURL ?? 'https://unsplash.it/1200/600'} />
	<meta
		name="twitter:image:alt"
		content="Open graph representation of this blog article, {articleTitle ?? 'Blog'}."
	/>

	{#if darkMode}
		<!-- eslint-disable-next-line -->
		{@html DarkCodeTheme}
	{:else}
		<!-- eslint-disable-next-line -->
		{@html LightCodeTheme}
	{/if}
</svelte:head>

<div
	class="blog-container h-full min-h-[100vh] bg-gray-200 px-4 py-16 tracking-wide text-gray-900 dark:bg-black dark:text-white sm:px-10 sm:py-10 md:flex md:flex-col md:items-center md:px-20 xl:px-60 2xl:px-80 [&_sub]:text-inherit [&_sup]:text-inherit"
	in:fade={{ duration: 500 }}
>
	<div>
		<h1 class="text-4xl dark:text-white sm:text-5xl md:mb-4 md:text-6xl lg:text-7xl">
			{articleTitle}
		</h1>
		<p class="max-w-[45ch] text-xl text-gray-700 dark:text-gray-100 md:text-2xl md:leading-9">
			<em class="text-gray-300"><TextMacro type={subtitle} /></em>
		</p>
	</div>
	<hr class="my-10 w-full border-black opacity-50 dark:border-white" />
	<div>
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
	</div>
	<hr class="my-10 w-full border-black opacity-50 dark:border-white" />
	<div class="notion-container max-w-[60ch] text-xl lg:text-2xl [&_p]:mb-[1em]" bind:this={context}>
		<NotionPageParser results={content} />
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/blog" data-sveltekit-noscroll class="inline-block p-6 text-gray-900 dark:text-white"
			>back.</a
		>
	</p>
</div>

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
		restOfContent: ListBlockChildrenResponse;
	};

	let context: HTMLDivElement;

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
		],
		restOfContent
	} = data;

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
	<title>{title}</title>
	<meta name="description" content={ogDescription.rich_text[0].plain_text} />
	{#if darkMode}
		{@html DarkCodeTheme}
	{:else}
		{@html LightCodeTheme}
	{/if}
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
	<div class="notion-container" bind:this={context}>
		<NotionPageParser results={content} />
		{#if restOfContent}
			<NotionPageParser results={restOfContent.results} />
		{/if}
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/blog" data-sveltekit-noscroll class="inline-block p-6 text-gray-900 dark:text-white"
			>back.</a
		>
	</p>
</div>

<script lang="ts">
	import NotionPageParser from '$lib/notion/notion-page-parser.svelte';
	import { fade } from 'svelte/transition';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import DarkCodeTheme from 'svelte-highlight/styles/agate';
	import LightCodeTheme from 'svelte-highlight/styles/a11y-light';
	import { onMount, tick } from 'svelte';
	import { subAndSuper, wrapLists, createTOC } from '$lib/notion/blog-helpers';
	import type {
		PageObjectResponse,
		TitlePropertyItemObjectResponse,
		RichTextPropertyItemObjectResponse,
		UrlPropertyItemObjectResponse,
		SelectPropertyItemObjectResponse,
		FormulaPropertyItemObjectResponse,
		QueryDatabaseResponse
	} from '@notionhq/client/build/src/api-endpoints';

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
		post: {
			queryResponse: { results: QueryDatabaseResponse[] };
			contentResponse: { results: any[] };
		};
	};

	let context: HTMLDivElement;

	const { queryResponse, contentResponse } = data.post;
	const blogPost = queryResponse.results[0] as PageObjectResponse;
	const content = contentResponse.results;

	const { title, subtitle, summary, ogDescription, readingTime, category, slug, coverURL } =
		blogPost.properties as unknown as {
			title: TitlePropertyItemObjectResponse;
			subtitle: RichTextPropertyItemObjectResponse;
			summary: RichTextPropertyItemObjectResponse;
			ogDescription: RichTextPropertyItemObjectResponse;
			readingTime: FormulaPropertyItemObjectResponse;
			category: SelectPropertyItemObjectResponse;
			slug: RichTextPropertyItemObjectResponse;
			coverURL: UrlPropertyItemObjectResponse;
		};

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
	<title>{title ?? 'Blog'}</title>
	<meta name="og:title" content={title.title.rich_text[0].plain_text ?? 'Blog'} />
	<meta name="description" content={ogDescription.rich_text[0].plain_text ?? ''} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com/blog/{slug}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog - {title ?? 'Blog'}" />
	<meta property="og:description" content={ogDescription.rich_text[0].plain_text ?? ''} />
	<meta property="og:image" content={coverURL ?? 'https://unsplash.it/1200/600'} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/blog" />
	<meta name="twitter:title" content="Blog - {title ?? 'Blog'}" />
	<meta name="twitter:description" content={ogDescription.rich_text[0].plain_text ?? ''} />
	<meta name="twitter:image" content={coverURL ?? 'https://unsplash.it/1200/600'} />
	<meta
		name="twitter:image:alt"
		content="Open graph representation of this blog article, {title ?? 'Blog'}."
	/>

	{#if darkMode}
		<!-- eslint-disable-next-line -->
		{@html DarkCodeTheme}
	{:else}
		<!-- eslint-disable-next-line -->
		{@html LightCodeTheme}
	{/if}
</svelte:head>

<div class="blog-container">
	<div>
		<h1>{title}</h1>
		<p class="subtitle">
			<em><TextMacro type={subtitle} /></em>
		</p>
	</div>
	<hr />
	<div>
		<p class="meta-info">
			<em>type</em>
			<span>{category}</span>
		</p>
		<p class="meta-info">
			<em>time</em>
			<span>
				{#if readingTime !== '1 minutes'}
					{readingTime}
				{:else}
					1 minute
				{/if}
			</span>
		</p>
		<p class="meta-info">
			<em>tl;dr</em>
			<span>
				<TextMacro type={summary} />
			</span>
		</p>
	</div>
	<hr />
	<div class="notion-container" bind:this={context}>
		<NotionPageParser results={content} />
	</div>
	<p class="back-link">
		<a href="/blog" data-sveltekit-noscroll>back.</a>
	</p>
</div>

<style>
	.blog-container {
		background-color: #e5e7eb;
		padding: 4rem 1rem;
		height: 100%;
		min-height: 100vh;
		color: #111827;
		letter-spacing: 0.05em;

		@media (min-width: 640px) {
			padding: 2.5rem;
		}

		@media (min-width: 768px) {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 2.5rem 5rem;
		}

		@media (min-width: 1280px) {
			padding: 2.5rem 15rem;
		}

		@media (min-width: 1536px) {
			padding: 2.5rem 20rem;
		}

		:global(sub),
		:global(sup) {
			color: inherit;
		}
	}

	h1 {
		font-size: 2.25rem;
		line-height: 2.5rem;

		@media (min-width: 640px) {
			font-size: 3rem;
			line-height: 1;
		}

		@media (min-width: 768px) {
			margin-bottom: 1rem;
			font-size: 3.75rem;
			line-height: 1;
		}

		@media (min-width: 1024px) {
			font-size: 4.5rem;
			line-height: 1;
		}
	}

	.subtitle {
		max-width: 45ch;
		color: #374151;
		font-size: 1.25rem;
		line-height: 1.75rem;

		@media (min-width: 768px) {
			font-size: 1.5rem;
			line-height: 2.25rem;
		}

		em {
			color: #6b7280;
		}
	}

	hr {
		opacity: 0.5;
		margin: 2.5rem 0;
		border-color: #111827;
		width: 100%;
	}

	.meta-info {
		display: flex;
		margin-bottom: 1rem;
		max-width: 45ch;

		em {
			display: block;
			width: 5ch;
			color: #111827;
			font-weight: 500;
		}

		span {
			display: block;
			width: 35ch;
			color: #374151;
		}
	}

	.notion-container {
		max-width: 60ch;
		font-size: 1.25rem;
		line-height: 1.75rem;

		@media (min-width: 1024px) {
			font-size: 1.5rem;
			line-height: 2rem;
		}

		:global(p) {
			margin-bottom: 1em;
		}
	}

	.back-link {
		font-size: 2.25rem;
		line-height: 2.5rem;
		text-align: right;

		@media (min-width: 768px) {
			font-size: 3.75rem;
			line-height: 1;
		}

		a {
			display: inline-block;
			padding: 1.5rem;
			color: #111827;
		}
	}

	:global(.dark) {
		.blog-container {
			background-color: #000;
			color: #fff;
		}

		.subtitle {
			color: #e5e7eb;

			em {
				color: #d1d5db;
			}
		}

		hr {
			border-color: #fff;
		}

		.meta-info {
			em {
				color: #fff;
			}

			span {
				color: #e5e7eb;
			}
		}

		.back-link a {
			color: #fff;
		}
	}
</style>

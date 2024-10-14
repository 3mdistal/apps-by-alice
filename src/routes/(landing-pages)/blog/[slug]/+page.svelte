<script lang="ts">
	import NotionPageParser from '$lib/notion/notion-page-parser.svelte';
	import { fade } from 'svelte/transition';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import DarkCodeTheme from 'svelte-highlight/styles/nord';
	import LightCodeTheme from 'svelte-highlight/styles/github';
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
	let context: HTMLElement;

	function setDarkMode() {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		darkMode = mediaQuery.matches;
		mediaQuery.addEventListener('change', (e) => {
			darkMode = e.matches;
		});
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
			queryResponse: QueryDatabaseResponse | null;
			contentResponse: any | null;
		};
	};

	const { queryResponse, contentResponse } = data.post || {};

	const blogPost = queryResponse?.results?.[0] as PageObjectResponse | undefined;

	const content = contentResponse?.results || [];

	const {
		Name: title,
		Subtitle: subtitle,
		Summary: summary,
		OGDescription: ogDescription,
		ReadTime: readingTime,
		Category: category,
		Slug: slug,
		Preview: coverURL
	} = blogPost?.properties || {};

	// Helper function to safely get text content
	function getTextContent(prop: any) {
		if (prop?.type === 'title') {
			return prop.title?.[0]?.plain_text || '';
		}
		return prop?.rich_text?.[0]?.plain_text || '';
	}

	onMount(() => {
		runBlogHelpers();
		fetch(window.location.href, {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		darkMode = mediaQuery.matches;
		mediaQuery.addEventListener('change', (e) => {
			darkMode = e.matches;
		});
	});
</script>

<svelte:head>
	<title>{getTextContent(title) || 'Blog'}</title>
	<meta name="og:title" content={getTextContent(title) || 'Blog'} />
	<meta name="description" content={getTextContent(ogDescription)} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com/blog/{slug}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog - {getTextContent(title) || 'Blog'}" />
	<meta property="og:description" content={getTextContent(ogDescription)} />
	<meta property="og:image" content={coverURL?.url ?? 'https://unsplash.it/1200/600'} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tempoimmaterial" />
	<meta name="twitter:creator" content="@tempoimmaterial" />
	<meta name="twitter:domain" content="alicealexandra.com" />
	<meta name="twitter:url" content="https://www.alicealexandra.com/blog" />
	<meta name="twitter:title" content="Blog - {getTextContent(title) || 'Blog'}" />
	<meta name="twitter:description" content={getTextContent(ogDescription)} />
	<meta name="twitter:image" content={coverURL?.url ?? 'https://unsplash.it/1200/600'} />
	<meta
		name="twitter:image:alt"
		content="Open graph representation of this blog article, {getTextContent(title) || 'Blog'}."
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
		<h1>{getTextContent(title) || 'Untitled'}</h1>
		<p class="subtitle">
			<em
				>{#if subtitle}<TextMacro type={subtitle} />{/if}</em
			>
		</p>
	</div>
	<hr />
	<div>
		<p class="meta-info">
			<em>type</em>
			<span>{category?.select?.name || 'Uncategorized'}</span>
		</p>
		<p class="meta-info">
			<em>time</em>
			<span>
				{#if readingTime?.formula?.string}
					{readingTime.formula.string === '1 minutes' ? '1 minute' : readingTime.formula.string}
				{:else}
					Unknown
				{/if}
			</span>
		</p>
		<p class="meta-info">
			<em>tl;dr</em>
			<span>
				{#if summary}<TextMacro type={summary} />{/if}
			</span>
		</p>
	</div>
	<hr />
	{#if content.length > 0}
		<div class="notion-container" bind:this={context}>
			<NotionPageParser results={content} />
		</div>
	{:else}
		<p>No content available.</p>
	{/if}
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

		@media (prefers-color-scheme: dark) {
			background-color: #141414;
			color: #e5e7eb;

			:global(*) {
				color: #e5e7eb;
			}

			:global(a),
			:global(code),
			:global(.notion-container a),
			:global(.notion-container code) {
				color: #a3e5eb;
			}
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

		@media (prefers-color-scheme: dark) {
			color: #d1d5db;

			em {
				color: #9ca3af;
			}
		}
	}

	hr {
		opacity: 0.5;
		margin: 2.5rem 0;
		border-color: #111827;
		width: 100%;

		@media (prefers-color-scheme: dark) {
			border-color: #4b5563;
		}
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

		@media (prefers-color-scheme: dark) {
			em {
				color: #e5e7eb;
			}

			span {
				color: #d1d5db;
			}
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

			@media (prefers-color-scheme: dark) {
				color: #e5e7eb;
			}
		}
	}

	/* Styles from blog-post.css */
	.blog-container {
		:global(.notion-container .toc) {
			margin-top: 2em;
			margin-bottom: 2em;
		}

		:global(.notion-container a) {
			color: #31676c;
			font-weight: 500;

			&:hover {
				text-decoration: underline;
			}

			@media (prefers-color-scheme: dark) {
				color: #a3e5eb;
			}
		}

		:global(.notion-container code) {
			color: #31676c;

			@media (prefers-color-scheme: dark) {
				color: #a3e5eb;
			}
		}

		:global(.notion-container blockquote) {
			margin-top: 2.5rem;
			margin-left: 2em;
			max-width: 40ch;
			color: #d1d5db;
			font-style: italic;

			@media (prefers-color-scheme: dark) {
				color: #9ca3af;
			}
		}

		:global(.notion-container .image) {
			margin-top: 2em;
			margin-bottom: 2em;
			padding-right: 0.5em;

			@media (min-width: 640px) {
				padding-right: 3em;
				padding-left: 1em;
			}

			& img {
				border-radius: 1.5rem;
				width: 100%;
				height: 100%;
				object-fit: contain;

				@media (min-width: 1024px) {
					object-position: left;
				}
			}
		}

		:global(.notion-container h2) {
			margin-top: 2.5em;
			margin-bottom: 1.5em;
			color: #111827;
			font-weight: 500;
			font-size: 1.5rem;

			@media (min-width: 768px) {
				font-size: 1.875rem;
			}

			@media (min-width: 1024px) {
				font-size: 2.25rem;
			}

			@media (prefers-color-scheme: dark) {
				color: #f3f4f6;
			}
		}

		:global(.notion-container h3) {
			margin-top: 1.5em;
			margin-bottom: 1em;
			color: #111827;
			font-weight: 500;
			font-size: 1.5rem;

			@media (min-width: 768px) {
				font-size: 1.875rem;
			}

			@media (prefers-color-scheme: dark) {
				color: #f3f4f6;
			}
		}

		:global(.notion-container ol),
		:global(.notion-container ul) {
			margin-left: 2em;

			li {
				color: inherit;
			}

			@media (prefers-color-scheme: dark) {
				color: #e5e7eb;
			}
		}

		:global(.notion-container hr) {
			margin: 3em auto;
			width: 30%;
		}

		:global(ol) {
			list-style-type: decimal;
		}

		:global(ul) {
			list-style-type: disc;
		}

		:global(div.callout) {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
			margin-top: 2.5rem;
			margin-bottom: 1.5rem;
			border-radius: 0.5rem;
			background-color: #d1d5db;
			padding: 2.5rem 1rem 1.5rem;

			@media (min-width: 768px) {
				gap: 2.5rem;
				padding-right: 5rem;
				padding-left: 5rem;
			}

			& > :first-child {
				font-size: 1.5rem;

				@media (min-width: 768px) {
					font-size: 2.25rem;
				}
			}

			& > :last-child {
				font-size: 1.125rem;

				@media (min-width: 768px) {
					font-size: 1.25rem;
				}
			}

			@media (prefers-color-scheme: dark) {
				background-color: #1f2937;
			}
		}

		:global(.notion-container p) {
			color: #4b5563;

			@media (prefers-color-scheme: dark) {
				color: #d1d5db;
			}
		}
	}

	.blog-container {
		:global(.notion-container code) {
			font-family: 'Cutive Mono', 'Courier New', Courier, monospace;
		}

		:global(.notion-container pre code *) {
			font-family: 'Cutive Mono', 'Courier New', Courier, monospace;
		}
	}
</style>

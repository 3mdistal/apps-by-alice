<script lang="ts">
	/* This component takes in an array of blocks from a Notion page as results. 
  It parses it to netural content which can then be styled with an outside stylesheet. */

	import TextMacro from '$lib/notion/text-macro.svelte';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	import NotionImage from './notion-image.svelte';
	import Socials from '$lib/icons/socials.svelte';
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

	export let results: Array<BlockObjectResponse>;
</script>

{#each results as result (result.id)}
	{#if result.type == 'paragraph'}
		{#if result.paragraph.rich_text.length > 0}
			<p>
				<TextMacro type={result.paragraph} />
			</p>
		{:else}
			<br />
		{/if}
	{:else if result.type === 'heading_2'}
		<h2>
			<TextMacro type={result.heading_2} />
		</h2>
	{:else if result.type === 'heading_3'}
		<h3>
			<TextMacro type={result.heading_3} />
		</h3>
	{:else if result.type === 'numbered_list_item'}
		<li class="ordered">
			<TextMacro type={result.numbered_list_item} />
		</li>
	{:else if result.type === 'bulleted_list_item'}
		<li>
			<TextMacro type={result.bulleted_list_item} />
		</li>
	{:else if result.type === 'callout'}
		<div class="callout">
			{#if result.callout.icon?.type === 'emoji'}
				<p>{result.callout.icon.emoji}</p>
			{:else if result.callout.icon?.type === 'external'}
				<div><img src={result.callout.icon.external.url} alt="" /></div>
			{:else if result.callout.icon?.type === 'file'}
				<div>
					<NotionImage id={result.id} alt="" callout />
				</div>
			{/if}

			<p class="whitespace-pre-line">
				<TextMacro type={result.callout} />
			</p>
		</div>
	{:else if result.type === 'quote'}
		<blockquote class="whitespace-pre-line">
			<TextMacro type={result.quote} />
		</blockquote>
	{:else if result.type === 'image'}
		<div class="image relative">
			{#if result.image.type === 'external'}
				<img src={result.image.external.url} alt={result.image.caption[0]?.plain_text} />
			{:else if result.image.type === 'file'}
				<NotionImage
					id={result.id}
					alt={result.image.caption[0]?.plain_text ? result.image.caption[0].plain_text : ''}
				/>
			{/if}
		</div>
	{:else if result.type === 'code'}
		<div
			class="pb-6 [&_.hljs]:rounded-lg [&_.hljs]:bg-gray-300 dark:[&_.hljs]:bg-[#141414] [&_code]:text-lg [&_code]:tracking-tighter [&_span.hljs-name]:text-teal-700 dark:[&_span.hljs-name]:text-red-300 dark:[&_span.hljs-params]:text-gray-300 dark:[&_span.hljs-property]:text-gray-300 dark:[&_span.language-css]:text-gray-300 dark:[&_span.language-javascript]:text-gray-300 [&_span]:font-mono"
		>
			{#if result.code.language === 'typescript'}
				<Highlight language={typescript} code={result.code.rich_text[0]?.plain_text} />
			{:else if result.code.language === 'php'}
				<HighlightSvelte code={result.code.rich_text[0]?.plain_text} />
			{:else if result.code.language === 'html'}
				<!-- eslint-disable-next-line -->
				{@html result.code.rich_text[0]?.plain_text}
			{:else if result.code.language === 'plain text'}
				{#if result.code.rich_text[0]?.plain_text.includes('Socials')}
					{#if result.code.rich_text[0]?.plain_text.includes('small')}
						<div class="w-20">
							<Socials />
						</div>
					{:else}
						<Socials />
					{/if}
				{:else}
					<!-- eslint-disable-next-line -->
					{@html result.code.rich_text[0]?.plain_text}
				{/if}
			{/if}
		</div>
	{:else if result.type === 'divider'}
		<div class="px-[30%] pb-10 pt-2 md:px-[35%]">
			<hr />
		</div>
	{/if}
{/each}

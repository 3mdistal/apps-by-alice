<script lang="ts">
	/* This component takes in an array of blocks from a Notion page as results. 
  It parses it to netural content which can then be styled with an outside stylesheet. */

	import TextMacro from '$lib/notion/text-macro.svelte';
	import { onMount } from 'svelte';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import DarkCodeTheme from 'svelte-highlight/styles/agate';
	import LightCodeTheme from 'svelte-highlight/styles/a11y-light';
	import { currentBlog } from '$lib/stores';
	import NotionImage from './notion-image.svelte';

	let darkMode: boolean;

	function setDarkMode() {
		darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	function subAndSuper() {
		const notionContainer = document.querySelector('.notion-container')!;
		const content = Array.from(notionContainer.querySelectorAll(':scope>p'));
		const superscript = /\{super:([^}]*)\}/g;
		const subscript = /\{sub:([^}]*)\}/g;
		content.forEach((e) => {
			e.innerHTML = e.innerHTML
				.replace(superscript, '<sup>$1</sup>')
				.replace(subscript, '<sub>$1</sub>');
		});
	}

	function wrapLists() {
		// Select all list items
		const liArray = Array.from(document.querySelectorAll('li'));

		const firstSiblings: HTMLLIElement[] = [];

		// Loop through all list items to get first sibling of new group
		liArray.forEach((li) => {
			if (
				li.previousElementSibling?.tagName !== 'LI' ||
				li.className !== li.previousElementSibling?.className
			) {
				firstSiblings.push(li);
			}
		});

		// Loop over each first sibling to create new parent for group
		firstSiblings.forEach((fs) => {
			const newParent = document.createElement(fs.classList.contains('ordered') ? 'ol' : 'ul');
			fs.parentNode!.insertBefore(newParent, fs);
			// Loop over parent siblings until they're not <li>
			for (
				let i = newParent.nextElementSibling;
				i && i.tagName && i.tagName === 'LI';
				i = newParent.nextElementSibling
			) {
				newParent.appendChild(i);
			}
		});
	}

	function createTOC() {
		const headerTwos = Array.from(document.querySelectorAll('h2'));
		const ol = document.createElement('ol');
		ol.className = 'toc';
		for (let i = 1; i <= headerTwos.length; i++) {
			const headerTwo: HTMLHeadingElement = headerTwos[i - 1]!;
			headerTwo.id = i.toString();
			const TOCItem = document.createElement('li');
			const TOCLink = document.createElement('a');
			TOCLink.innerText = headerTwo.innerText;
			TOCLink.href = `#${i}`;
			TOCItem.appendChild(TOCLink);
			ol.appendChild(TOCItem);
		}
		headerTwos[0]?.parentElement?.insertBefore(ol, headerTwos[0]);
	}

	onMount(() => {
		setTimeout(subAndSuper);
		setTimeout(wrapLists);
		setTimeout(createTOC);
		setTimeout(setDarkMode);
	});
</script>

{#each $currentBlog as result (result.id)}
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
	{:else if result.type == 'heading_3'}
		<h3>
			<TextMacro type={result.heading_3} />
		</h3>
	{:else if result.type == 'numbered_list_item'}
		<li class="ordered">
			<TextMacro type={result.numbered_list_item} />
		</li>
	{:else if result.type == 'bulleted_list_item'}
		<li>
			<TextMacro type={result.bulleted_list_item} />
		</li>
	{:else if result.type == 'callout'}
		<div class="callout">
			{#if result.callout.icon?.type == 'emoji'}
				<p>{result.callout.icon.emoji}</p>
			{:else if result.callout.icon?.type == 'external'}
				<div><img src={result.callout.icon.external.url} alt="" /></div>
			{:else if result.callout.icon?.type == 'file'}
				<div>
					<img src={result.callout.icon.file.url} alt="" />
				</div>
			{/if}

			<p class="whitespace-pre-line">
				<TextMacro type={result.callout} />
			</p>
		</div>
	{:else if result.type == 'quote'}
		<blockquote class="whitespace-pre-line">
			<TextMacro type={result.quote} />
		</blockquote>
	{:else if result.type == 'image'}
		<div class="image relative">
			{#if result.image.type == 'external'}
				<img src={result.image.external.url} alt={result.image.caption[0]?.plain_text} />
			{:else if result.image.type == 'file'}
				<!-- <img src={result.image.file.url} alt="" /> -->
				<NotionImage
					id={result.id}
					alt={result.image.caption[0]?.plain_text ? result.image.caption[0].plain_text : ''}
				/>
			{/if}
		</div>
	{:else if result.type === 'code'}
		<div
			class="[&_span]:font-mono pb-6 dark:[&_span.hljs-params]:text-gray-300 dark:[&_span.language-css]:text-gray-300 dark:[&_span.language-javascript]:text-gray-300 dark:[&_span.hljs-name]:text-red-300 [&_span.hljs-name]:text-teal-700 dark:[&_span.hljs-property]:text-gray-300 [&_code]:text-lg [&_code]:tracking-tighter [&_.hljs]:rounded-lg [&_.hljs]:bg-gray-300 dark:[&_.hljs]:bg-[#141414]"
		>
			{#if result.code.language === 'typescript'}
				<Highlight language={typescript} code={result.code.rich_text[0]?.plain_text} />
			{:else if result.code.language === 'html'}
				<HighlightSvelte code={result.code.rich_text[0]?.plain_text} />
			{/if}
		</div>
	{/if}
{/each}

<svelte:head>
	{#if darkMode}
		{@html DarkCodeTheme}
	{:else}
		{@html LightCodeTheme}
	{/if}
</svelte:head>

<script lang="ts">
	/* This component takes in an array of blocks from a Notion page as results. 
  It parses it to netural content which can then be styled with an outside stylesheet. */

	import TextMacro from '$lib/notion/text-macro.svelte';
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount } from 'svelte';

	export let results: [BlockObjectResponse];

	function subAndSuper() {
		const notionContainer = document.querySelector('.notion-container')!;
		const content = Array.from(notionContainer.querySelectorAll(':scope > *'));
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

		const firstSiblings = [];

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
			fs.parentNode.insertBefore(newParent, fs);
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
			headerTwo.id = i;
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
	});
</script>

{#each results as result}
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
				<div><img src={result.callout.icon.file.url} alt="" /></div>
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
		<div class="image">
			{#if result.image.type == 'external'}
				<img src={result.image.external.url} alt={result.image.caption[0]?.plain_text} />
			{:else if result.image.type == 'file'}
				<img src={result.image.file.url} alt={result.image.caption[0]?.plain_text} />
			{/if}
		</div>
	{/if}
{/each}

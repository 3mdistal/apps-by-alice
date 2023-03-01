<script lang="ts">
	/* This component takes in an array of blocks from a Notion page as results. 
  It parses it to netural content which can then be styled with an outside stylesheet. */

	import TextMacro from '$lib/notion/text-macro.svelte';
	import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount } from 'svelte';

	export let results: [BlockObjectResponse];

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
				console.log(i);
			}
		});
	}

	onMount(() => {
		setTimeout(wrapLists);
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
		<h2 id={result.heading_2.rich_text[0].text.content}>
			<TextMacro type={result.heading_2} />
		</h2>
	{:else if result.type == 'heading_3'}
		<h3 id={result.heading_3.rich_text[0].text.content}>
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
			<p>💡</p>
			<p>
				<TextMacro type={result.callout} />
			</p>
		</div>
	{/if}
{/each}

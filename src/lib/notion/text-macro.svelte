<script lang="ts">
	import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
	export let type: { rich_text: RichTextItemResponse[] };
</script>

{#each type.rich_text as rich_text}
	{#if rich_text.href}
		<a href={rich_text.href}>{rich_text.text.content}</a>
	{:else if rich_text.annotations.code}
		<code>{rich_text.text.content}</code>
	{:else if rich_text.annotations.italic}
		<em class="text-inherit">{rich_text.text.content}</em>
	{:else if rich_text.annotations.bold}
		<strong class="text-inherit">{rich_text.text.content}</strong>
	{:else if rich_text.annotations.strikethrough}
		<span class="line-through text-inherit">{rich_text.text.content}</span>
	{:else}
		{rich_text.text.content}
	{/if}
{/each}

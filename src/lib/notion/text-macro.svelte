<script>
	export let type;
</script>

{#each type.rich_text as rich_text}
	{#if rich_text.href}
		<a href={rich_text.href}>{rich_text.text.content}</a>
	{:else if rich_text.annotations.code}
		<code>{rich_text.text.content}</code>
	{:else if rich_text.annotations.italic}
		<em>{rich_text.text.content}</em>
	{:else if rich_text.annotations.bold}
		<strong>{rich_text.text.content}</strong>
	{:else}
		{rich_text.text.content}
	{/if}
{/each}

<script lang="ts">
  import type { RichTextItemResponse, TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
  export let type: { rich_text: Array<RichTextItemResponse> };
  export let paragraphs: boolean = false;

  function isTextRichTextItem(item: RichTextItemResponse): item is TextRichTextItemResponse {
    return item.type === 'text';
  }
</script>

{#each type.rich_text as rich_text}
  {#if isTextRichTextItem(rich_text)}
    {#if rich_text.href}
      <a href={rich_text.href}>{rich_text.text.content}</a>
    {:else if rich_text.annotations.code}
      <code>{rich_text.text.content}</code>
    {:else if rich_text.annotations.italic}
      <em class="text-inherit">{rich_text.text.content}</em>
    {:else if rich_text.annotations.bold}
      <strong class="text-inherit">{rich_text.text.content}</strong>
    {:else if rich_text.annotations.strikethrough}
      <span class="text-inherit line-through">{rich_text.text.content}</span>
    {:else if paragraphs === true}
      <p>{rich_text.text.content}</p>
    {:else}
      {rich_text.text.content}
    {/if}
  {:else if rich_text.type === 'mention'}
    <!-- Handle mentions -->
    <span class="mention">{rich_text.plain_text}</span>
  {:else if rich_text.type === 'equation'}
    <!-- Handle equations -->
    <span class="equation">{rich_text.plain_text}</span>
  {/if}
{/each}
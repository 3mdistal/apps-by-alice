<script lang="ts">
	// Component displays blog listing from Notion. Also revalidates Notion data as needed.

	import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
	import { onMount } from 'svelte';

	export let accent: string;
	export let data: { post: QueryDatabaseResponse };

	let {
		post: { results }
	} = data;

	onMount(() => {
		fetch('/blog', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});
</script>

<h3 class="mb-[1em] text-2xl md:text-3xl lg:text-4xl font-medium" style="color: {accent}">Posts</h3>
{#each results as { properties: { Slug: { url }, Name: { title: [{ text: { content: title } }] }, FormattedPublicationDate: { formula: { string: date } } } }}
	<div class="flex flex-col lg:flex-row mb-6 justify-between md:gap-x-[2vw]">
		<p>
			<a
				data-sveltekit-preload-code="viewport"
				data-sveltekit-preload-data="hover"
				class="text-white font-medium hover:underline active:text-gray-400"
				href="blog/{url}">{title}</a
			>
		</p>
		<p class="text-white">
			{date}
		</p>
	</div>
{/each}

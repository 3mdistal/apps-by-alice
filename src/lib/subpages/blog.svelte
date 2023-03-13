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

<h3 class="mb-[1em] text-2xl font-medium md:text-3xl lg:text-4xl" style="color: {accent}">Posts</h3>
{#each results as { properties: { Slug: { url }, Name: { title: [{ text: { content: title } }] }, FormattedPublicationDate: { formula: { string: date } } } }}
	<div class="mb-6 flex flex-col justify-between md:gap-x-[2vw] lg:flex-row">
		<p>
			<a
				on:click={() => (title = 'Loading . . .')}
				data-sveltekit-preload-code="viewport"
				data-sveltekit-preload-data="hover"
				class="font-medium text-white hover:underline active:text-gray-400"
				href="blog/{url}">{title}</a
			>
		</p>
		<p class="text-white">
			{date}
		</p>
	</div>
{/each}

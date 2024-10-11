<script lang="ts">
	import { goto } from '$app/navigation';

	// Component displays blog listing from Notion. Also revalidates Notion data as needed.

	import TextMacro from '$lib/notion/text-macro.svelte';
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
{#each results as { properties: { Slug: { url }, Name: { title: [{ text: { content: title } }] }, Subtitle, Category: { select: { name: category } }, FormattedPublicationDate: { formula: { string: date } } } }}
	<div class="mb-6 grid grid-cols-2 md:grid-cols-3">
		<p class="col-span-2 md:col-span-2">
			<a
				on:mousedown={() => {
					title = 'Loading . . .';
					goto(`/blog/${url}`);
				}}
				on:click|preventDefault
				class="font-medium text-white hover:underline active:text-gray-400"
				href="/blog/{url}">{title}</a
			>
		</p>
		<p class="col-span-2 row-start-2 italic text-gray-100"><TextMacro type={Subtitle} /></p>
		<p class="row-start-3 text-gray-100 md:col-start-3 md:row-start-1">
			{date}
		</p>
		<div class="col-start-2 flex justify-end md:col-start-1 md:justify-start">
			<p class="text-gray-100">
				{category}
			</p>
		</div>
	</div>
{/each}

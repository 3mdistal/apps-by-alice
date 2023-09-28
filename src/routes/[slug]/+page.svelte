<script lang="ts">
	import { replaceSpaces } from '$lib/helpers';
	import { onMount } from 'svelte';

	export let data;

	let {
		projects: { results: projects },
		stills: { results: stills }
	} = data;

	let pagePath: string;

	onMount(() => {
		pagePath = window.location.pathname.split('/')[1];
		console.log(data);
	});
</script>

{#each projects as { properties: { Root, Name } }}
	{#if replaceSpaces(Root.select.name, false) === pagePath}
		<p>{Name.title[0].plain_text}!</p>
	{/if}
{/each}

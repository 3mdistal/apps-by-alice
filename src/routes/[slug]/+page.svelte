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

<svelte:head>
	<title>{pagePath}</title>
</svelte:head>

{#each projects as { properties: { Root, Name } }}
	{#if replaceSpaces(Name.title[0].plain_text, false) === pagePath}
		<div class="m-auto max-w-[50ch] py-[25vh]">
			<h2>{Name.title[0].plain_text}!</h2>
		</div>
	{/if}
{/each}

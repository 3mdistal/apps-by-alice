<script lang="ts">
	import LoadingSpinner from '$lib/icons/loading-spinner.svelte';
	import NotionPageParser from './notion-page-parser.svelte';

	export let id: string;

	const refreshContent = async () => {
		const response = await fetch('/blog/api', {
			method: 'POST',
			body: JSON.stringify({ id, method: 'children' }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const content = await response.json();
		console.log(content);

		return content;
	};
</script>

{#await refreshContent()}
	<LoadingSpinner />
{:then content}
	<NotionPageParser results={content.results} />
{:catch error}
	<p>{error}</p>
{/await}

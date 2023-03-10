<script lang="ts">
	import LoadingSpinner from '$lib/icons/loading-spinner.svelte';

	export let id: string;
	export let alt: string;

	const refreshContent = async () => {
		const response = await fetch('/blog/api', {
			method: 'POST',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const content = await response.json();
		const source = content.image.file.url;

		return source;
	};
</script>

{#await refreshContent()}
	<LoadingSpinner />
{:then source}
	<img class="aspect-video text-white" {alt} src={source} />
{:catch error}
	<p>{error}</p>
{/await}

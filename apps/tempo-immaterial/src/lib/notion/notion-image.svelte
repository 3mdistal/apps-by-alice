<script lang="ts">
	import LoadingSpinner from '$lib/icons/loading-spinner.svelte';

	export let id: string;
	export let alt: string;
	export let callout = false;

	const refreshContent = async () => {
		const response = await fetch('/blog/api', {
			method: 'POST',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		let source;

		const content = await response.json();
		if (callout) {
			source = content.callout.icon.file.url;
		} else {
			source = content.image.file.url;
		}

		return source;
	};
</script>

{#await refreshContent()}
	<LoadingSpinner />
{:then source}
	<img class="text-white" {alt} src={source} />
{:catch error}
	<p>{error}</p>
{/await}

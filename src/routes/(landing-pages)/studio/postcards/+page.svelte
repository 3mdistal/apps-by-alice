<script>
	import ComingSoon from '$lib/subpages/studio/coming-soon.svelte';
	// @ts-ignore
	import ComingSoonPostcards from '$text/studio/postcards/coming-soon-postcards.svelte.md';
</script>

<ComingSoon>
	<svelte:fragment slot="title">postcards</svelte:fragment>

	<svelte:fragment slot="subtitle">all the rest from far away</svelte:fragment>

	<svelte:fragment slot="summary">
		Not everything I write fits into a category. This will be a spot for the outcasts.
	</svelte:fragment>

	<svelte:fragment slot="text">
		<ComingSoonPostcards />
	</svelte:fragment>
</ComingSoon>

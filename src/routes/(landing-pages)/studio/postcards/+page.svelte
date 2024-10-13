<script>
	import ComingSoon from '$lib/subpages/studio/coming-soon.svelte';
	// @ts-expect-error vite-imagetools not working properly
	import ComingSoonPostcards from '$text/studio/postcards/coming-soon-postcards.svelte.md';
</script>

<svelte:head>
	<title>Postcards</title>
	<meta
		name="description"
		content="Flash fiction, essays and anything else that doesn't really fit. Work by Alice Alexandra Moore."
	/>
</svelte:head>

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

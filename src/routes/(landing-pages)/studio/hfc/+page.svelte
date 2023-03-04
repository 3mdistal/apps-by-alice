<script>
	import ComingSoon from '$lib/subpages/studio/coming-soon.svelte';
	//@ts-ignore
	import ComingSoonHymns from '$text/studio/hymns/coming-soon-hymns.md';
</script>

<ComingSoon>
	<svelte:fragment slot="title">hymns for calliope</svelte:fragment>

	<svelte:fragment slot="subtitle">
		in which our heroine tries not to drown in the acheron
	</svelte:fragment>

	<svelte:fragment slot="summary">
		Poems old and new, republished in a collection here soon.
	</svelte:fragment>

	<svelte:fragment slot="text">
		<ComingSoonHymns />
	</svelte:fragment>
</ComingSoon>

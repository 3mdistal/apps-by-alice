<script>
	import ComingSoon from '$lib/subpages/studio/coming-soon.svelte';
	//@ts-expect-error vite-imagetools not working properly
	import ComingSoonBetson from '$text/studio/betson/coming-soon-betson.md';
</script>

<svelte:head>
	<title>Betson, Ohio</title>
	<meta
		name="description"
		content="In the backwoods, tangled undergrowth dictates creatures and canopies. A novel by Alice Alexandra Moore, based on where she grew up."
	/>
</svelte:head>

<ComingSoon>
	<svelte:fragment slot="title">betson, ohio</svelte:fragment>

	<svelte:fragment slot="subtitle">
		in the backwoods tangled undergrowth dictates creatures & canopies
	</svelte:fragment>

	<svelte:fragment slot="summary">
		Interconnected short stories getting published here soon.
	</svelte:fragment>

	<svelte:fragment slot="text">
		<ComingSoonBetson />
	</svelte:fragment>
</ComingSoon>

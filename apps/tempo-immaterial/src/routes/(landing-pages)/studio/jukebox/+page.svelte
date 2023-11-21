<script>
	import ComingSoon from '$lib/subpages/studio/coming-soon.svelte';
	// @ts-expect-error vite-imagetools not working properly
	import ComingSoonJukebox from '$text/studio/jukebox/coming-soon-jukebox.md';
</script>

<svelte:head>
	<title>Jukebox</title>
	<meta
		name="description"
		content="Music and compositions by Alice Alexandra Moore. Find her work on Soundcloud, Spotify, Apple Music, and Tidal."
	/>
</svelte:head>

<ComingSoon>
	<svelte:fragment slot="title">jukebox</svelte:fragment>

	<svelte:fragment slot="subtitle">attempts at taming the cacophany of noise</svelte:fragment>

	<svelte:fragment slot="summary">
		I write music. Will be publishing here and to streaming services soon.
	</svelte:fragment>

	<svelte:fragment slot="text">
		<ComingSoonJukebox />
	</svelte:fragment>
</ComingSoon>

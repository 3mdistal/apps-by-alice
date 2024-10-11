<script lang="ts">
	import ComingSoon from '$lib/subpages/studio/coming-soon.svelte';
	// @ts-expect-error vite-imagetools not working properly
	import ComingSoonTMI from '$text/studio/tmi/coming-soon-tmi.svelte.md';
</script>

<svelte:head>
	<title>These Makeshift Idiotika</title>
	<meta
		name="description"
		content="A sprawling world of lovers and fiends, torn by an ever-titling landscape. Fantasy world-building from Alice Alexandra Moore."
	/>
</svelte:head>

<ComingSoon>
	<svelte:fragment slot="title">these makeshift idiotika</svelte:fragment>

	<svelte:fragment slot="subtitle">
		a sprawling world of lovers & fiends torn by an ever-tilting landscape
	</svelte:fragment>

	<svelte:fragment slot="summary">You'll meet some characters very soon.</svelte:fragment>

	<svelte:fragment slot="text">
		<ComingSoonTMI />
	</svelte:fragment>
</ComingSoon>

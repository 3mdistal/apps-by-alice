<script>
    import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
    import ComingSoonBetson from "$text/studio/betson/coming-soon-betson.md";
</script>

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
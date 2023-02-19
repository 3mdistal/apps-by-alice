<script>
    import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
    import ComingSoonIllustrations from "$text/studio/illustrations/coming-soon-illustrations.md";
</script>

<ComingSoon>
    <svelte:fragment slot="title">illustrations</svelte:fragment>

    <svelte:fragment slot="subtitle">
        collected works of disparate instincts
    </svelte:fragment>

    <svelte:fragment slot="summary">
        I paint a lot. I'll be putting my art here shortly.
    </svelte:fragment>

    <svelte:fragment slot="text">
        <ComingSoonIllustrations />
    </svelte:fragment>
</ComingSoon>
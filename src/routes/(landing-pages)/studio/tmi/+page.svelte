<script>
    import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
    import ComingSoonTMI from "$text/studio/tmi/coming-soon-tmi.md";
</script>

<ComingSoon>
    <svelte:fragment slot="title">these makeshift idiotika</svelte:fragment>

    <svelte:fragment slot="subtitle">
        a sprawling world of lovers & fiends torn by an ever-tilting landscape
    </svelte:fragment>

    <svelte:fragment slot="summary">
        You'll meet some characters very soon.
    </svelte:fragment>

    <svelte:fragment slot="text">
        <ComingSoonTMI />
    </svelte:fragment>
</ComingSoon>
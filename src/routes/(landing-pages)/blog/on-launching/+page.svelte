<script>
    import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
    import OnLaunching from "../../../../cms/blog/on-launching-officially-this-site.svelte";
</script>

<ComingSoon>
    <svelte:fragment slot="title"
        >on launching (officially) this site</svelte:fragment
    >

    <svelte:fragment slot="subtitle">
        scattered hopes for the future
    </svelte:fragment>

    <svelte:fragment slot="summary">
        The site is usable! Please send feedback.
    </svelte:fragment>

    <svelte:fragment slot="text">
        <OnLaunching />
    </svelte:fragment>
</ComingSoon>

<script>
    import HomepageWrapper from "../lib/homepage/homepage-wrapper.svelte";
    import Svgs from "../lib/icons/svgs.svelte";
    import TopButton from "../lib/icons/top-button.svelte";
    import SiteTitle from "../lib/homepage/site-title.svelte";
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/reset.css" />
</svelte:head>

<SiteTitle />
<HomepageWrapper />
<TopButton />
<Svgs />

<style lang="scss">
    :global(.spacer) {
        height: 25vh;
    }

    :global(p) {
        font: {
            size: clamp(1rem, 1.5vw, 2rem);
        }
    }

    :global(h2) {
        font: {
            size: clamp(1.25rem, 2vw, 3rem);
            weight: 400;
        }
    }
</style>

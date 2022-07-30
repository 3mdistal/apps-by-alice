<script>
    import HomepageSectionContainer from "../lib/homepage-section-container.svelte";
    import SiteTitle from "../lib/site-title.svelte";
    import Svgs from "../lib/svgs.svelte";
    import TopButton from "../lib/top-button.svelte";
    // export let message;
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/reset.css" />
    <!-- <script defer src="/homepage.js"></script> -->
</svelte:head>

<SiteTitle />
<HomepageSectionContainer />
<Svgs />

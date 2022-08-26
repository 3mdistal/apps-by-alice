<script>
    import HomepageSectionContainer from "../lib/homepage/homepage-section-container.svelte";
    import Svgs from "../lib/icons/svgs.svelte";
    import TopButton from "../lib/icons/top-button.svelte";
    import SiteTitle from "../lib/homepage/site-title.svelte";
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/reset.css" />
</svelte:head>

<SiteTitle />
<HomepageSectionContainer />
<TopButton />
<Svgs />

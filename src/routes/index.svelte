<script>
    import HomepageMenuContainer from "../lib/homepage-menu-container.svelte";
    import SiteTitle from "../lib/site-title.svelte";
    import Svgs from "../lib/svgs.svelte";
    // export let message;
</script>

<svelte:head>
    <link rel="stylesheet" href="/sass/styles.css" />
    <link rel="stylesheet" href="/reset.css" />
    <script defer src="/homepage.js"></script>
</svelte:head>

<SiteTitle />
<HomepageMenuContainer />
<Svgs />
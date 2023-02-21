<script>
    // import Button from "$lib/icons/button.svelte";
    import LandingPage from "$lib/subpages/landing-page.svelte";
    import Bird from "$images/blog/bird.png?webp";
    import Blog from "$lib/subpages/blog.svelte";

    const accent = "#d1dce7";
    const background = "#838391";
</script>

<LandingPage
    header="unearth some thoughts (soon)."
    description="I'll be using the blog to keep you up to date on creative
			work, site revisions, and life updates."
    src="{Bird}"
    alt="A painting of a colorful bird in flight."
    flexReverse
    accent="{accent}"
    background="{background}"
    textWhite
>
    <!-- <Button
        slot="button"
        text="Read more."
        url="blog/coming-soon"
        accent="{accent}"
        background="{background}"
    /> -->
    <Blog accent="{accent}" background="{background}" />
</LandingPage>

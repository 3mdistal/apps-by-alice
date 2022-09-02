<script>
    import NotionParser from "../partials/notion-parser.svelte";
    import { accentColors, state } from "../stores";
    import SubpageContent from "../partials/subpage-content.svelte"
</script>

<div class="spacer" />

<SubpageContent notionSlug="about-what">
    <svelte:fragment slot="heading">
        <strong>tempo immaterial</strong>, verb, to dream of perpetual insufficiency.
    </svelte:fragment>
    <img slot="image" src="/images/about/owl.png" alt="A painting of a Screech Owl staring eerily at the viewer. Painting by Alice Alexandra Moore." />
</SubpageContent>

<div class="spacer" />

<SubpageContent NotionParser="about-who">
    <svelte:fragment slot="heading">
        i grew up in a backwoods town, just above the Ohio River.
    </svelte:fragment>
</SubpageContent>

<style lang="scss">
    
    strong {
        font-weight: 600;
    }

</style>

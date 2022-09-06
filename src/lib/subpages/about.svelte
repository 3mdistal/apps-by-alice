<script>
    import Button from "../icons/button.svelte";
    import Socials from "../icons/socials.svelte";
    import SubpageContent from "../partials/subpage-content.svelte";
</script>

<div class="spacer" />

<SubpageContent notionSlug="about-what">
    <svelte:fragment slot="heading">
        <strong>tempo immaterial</strong>, verb, to dream of perpetual
        insufficiency.
    </svelte:fragment>
    <img
        slot="image"
        src="/images/about/owl.png"
        alt="A painting of a Screech Owl staring eerily at the viewer. Painting by Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<SubpageContent notionSlug="about-who" notionTimeout="100" flexDirection="row">
    <svelte:fragment slot="heading">
        i grew up in a backwoods town, just above the Ohio River.
    </svelte:fragment>
    <img
        slot="image"
        src="/images/about/author-photo.jpg"
        alt="Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<SubpageContent notionSlug="about-why" notionTimeout="300">
    <svelte:fragment slot="heading">
        why do i limit my definition of meaningful?
    </svelte:fragment>
    <img
        slot="image"
        src="/images/about/mirror.jpeg"
        alt="Painting of a person sitting, holding a mirror. By Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<SubpageContent
    notionSlug="about-get-in-touch"
    notionTimeout="400"
    flexDirection="row"
>
    <svelte:fragment slot="heading">have thoughts to share?</svelte:fragment>
    <Socials slot="image" />
</SubpageContent>

<div class="spacer" />

<SubpageContent notionSlug="about-how" notionTimeout="200">
    <svelte:fragment slot="heading">
        i won't pretend i can do this alone.
    </svelte:fragment>
    <Button slot="button" text="Donate via Ko-Fi." url="https://ko-fi.com/tempoimmaterial"/>
    <img
        slot="image"
        src="/images/about/hands.jpeg"
        alt="Painting of a person holding their hands over their eyes. By Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<style lang="scss">
    strong {
        font-weight: 600;
    }

    img {
        object-fit: contain;
        border-radius: 50px;
    }
</style>

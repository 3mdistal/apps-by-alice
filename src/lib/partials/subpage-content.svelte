<script>
    import { state, accentColors } from "../stores";
    import NotionParser from "./notion-parser.svelte";

    export let notionSlug;
    export let notionTimeout;
    export let flexDirection = "row-reverse";
</script>

<div class="wrapper">
    <h2 style="color: {$accentColors[$state]}">
        <slot name="heading" />
    </h2>
    <div class="content" style="flex-direction: {flexDirection}">
        <div class="text">
            <NotionParser slug={notionSlug} timeout={notionTimeout} />
            <div class="button">
                <slot name="button" class="button" />
            </div>
        </div>
        <div class="image">
            <slot name="image" />
        </div>
    </div>
</div>

<style lang="scss">
    .wrapper {
        width: 75%;
        margin: 0 auto;
        text-align: center;
    }

    .image {
        max-width: 50%;
        position: sticky;
        top: 1em;

        @media screen and (max-width: 45rem) {
            max-width: 80%;
            margin: 0 auto;
        }
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        column-gap: 5em;

        @media screen and (max-width: 45rem) {
            flex-direction: column !important;
            row-gap: 3em;
        }
    }

    .text {
        text-align: left;
        max-width: 60ch;
    }

    h2 {
        margin-bottom: 1.5em;

        @media screen and (max-width: 45rem) {
            text-align: left;
        }
    }

    .button {
        margin-top: 3em;
        display: flex;
        justify-content: center;
    }
</style>

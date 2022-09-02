<script>
    import { state, accentColors } from "../stores"
    import NotionParser from "./notion-parser.svelte"
    
    export let notionSlug
</script>

<div class="wrapper">
    <h2 style="color: {$accentColors[$state]}">
        <slot name="heading" />
    </h2>
    <div class="content">
        <div class="text">
            <NotionParser slug={notionSlug} />
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

        @media screen and (max-width: 45rem) {
            width: 80%;
            margin: 0 auto;
        }
    }
    
    img {
        object-fit: contain;
    }
    
    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        column-gap: 5em;

        @media screen and (max-width: 45rem) {
            flex-direction: column;
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
</style>
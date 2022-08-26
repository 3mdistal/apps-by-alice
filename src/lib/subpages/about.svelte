<script>
    import NotionParser from "../partials/notion_parser.svelte";
    import { accentColors, state } from "../stores";
</script>

<div class="spacer" />
<div class="wrapper">
    <h2 style="color: {$accentColors[$state]}">
        <strong>tempo immaterial</strong>, verb, to dream of perpetual
        insufficiency.
    </h2>
    <div class="content">
        <div class="text">
            <NotionParser slug="about" />
        </div>
        <div class="image">
            <img src="/images/about/owl.png" alt="" />
        </div>
    </div>
</div>

<style lang="scss">
    .image {
        width: 40%;

        @media screen and (max-width: 45rem) {
            width: 80%;
            margin: 0 auto;
        }
    }
    img {
        object-fit: contain;
    }

    .spacer {
        height: 25vh;
    }
    .wrapper {
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        @media screen and (max-width: 45rem) {
            flex-direction: column;
        }
    }
    strong {
        font-weight: 600;
    }
    .text {
        text-align: left;
        max-width: 60ch;
        margin: 0 auto;
    }

    h2 {
        margin-bottom: 1.5em;
    }
</style>

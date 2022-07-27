<script>
    export let name;
    export let backgroundColor;
    export let accentColor;
</script>

<div
    class="homepage-section-content {name} hide invisible"
    style="background: {backgroundColor}"
>
    <div
        class="section-content-div bordered max-width-40"
        style="border-color: {accentColor}"
    >
        <h2 style="color: {accentColor}">
            <slot name="heading" />
        </h2>
        {#if name == "shop"}
        <p style="color: #fafafa">
            <slot name="description" />
        </p>
        {:else}
        <p>
            <slot name="description" />
        </p>
        {/if}
    </div>
    <div class="section-content-div">
        <slot name="image" />
    </div>
</div>

<style>
    .section-content-div {
        max-width: 50%;
        display: flex;
        flex-direction: column;
        row-gap: 1.5em;
    }

    h2 {
        margin: 0 10%;
        font-size: clamp(1.25rem, 2vw, 3rem);
        font-weight: 400;
    }

    p {
        margin: 0 10%;
        font-size: clamp(1rem, 1.5vw, 2rem);
    }

    .bordered {
        box-sizing: border-box;
        border-top: solid 2px;
        border-bottom: solid 2px;
        border-radius: 5%;
        padding: 8em 0;
    }

    .max-width-40 {
        max-width: 40%;
        margin: 0 auto;
    }

    @media screen and (max-width: 440px) {
        .max-width-40 {
            max-width: 90%;
        }
    }
</style>

<script>
    import { onMount } from "svelte";

    let article;
    export let slug = "";
    export let whiteSpace = "normal";

    async function fetchText() {
        const response = await fetch(`/api/notion/${slug}`);
        const data = await response.json();
        [...article] = data.text;
    }

    onMount(() => {
        fetchText().catch((error) => {
            console.error(error);
        });
    });
</script>

{#if article}
    {#each article as paragraph}
        <p style="white-space: {whiteSpace}">{paragraph}</p>
    {/each}
{:else}
    <p>Loading . . .</p>
{/if}

<style lang="scss">
    p {
        margin-bottom: 1.5em;
    }
</style>

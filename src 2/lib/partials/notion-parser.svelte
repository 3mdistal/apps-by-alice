<script>
    import { onMount } from "svelte";

    let article;
    export let slug = "";
    export let poem = false;
    export let timeout = 0;

    async function fetchText() {
        const response = await fetch(`/api/notion/${slug}`);
        const data = await response.json();
        [...article] = data.text;
    }

    let notionWrapper;

    onMount(() => {
        setTimeout(
            () =>
                fetchText()
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        if (poem === true) {
                            notionWrapper.style.whiteSpace = "pre";
                        }
                    }),
            timeout
        );
    });
</script>

<div bind:this={notionWrapper}>
    {#if article}
        {#each article as paragraph}
            <p>{paragraph}</p>
        {/each}
    {:else}
        <p>Loading . . .</p>
    {/if}
</div>

<style lang="scss">
    p {
        margin-bottom: 1.5em;
    }
</style>

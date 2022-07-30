<script>
    import Chevrons from "./icons/chevrons.svelte";
    import { state, accentColors } from "./stores";
    function scrollTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>

{#if $state !== "home"}
    <div on:click={scrollTop}>
        <Chevrons fill={$accentColors[$state]}/>
    </div>
{/if}

<style lang="scss">
    div {
        position: fixed;
        padding: .5em;
        width: clamp(2.5rem, 8%, 3.5rem);
        top: 1%;
        right: 1%;
        cursor: pointer;
    }
</style>

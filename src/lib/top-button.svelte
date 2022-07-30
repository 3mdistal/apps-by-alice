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

<style>
    div {
        box-sizing: border-box;
        padding: 1em;
        position: fixed;
        width: 4%;
        top: 2%;
        right: 1%;
        cursor: pointer;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    @media screen and (max-width: 45rem) {
        div {
            width: 7%;
            bottom: 2%;
        }
    }

    @media screen and (max-width: 30rem) {
        div {
            width: 15%;
            bottom: 2%;
        }
    }
</style>

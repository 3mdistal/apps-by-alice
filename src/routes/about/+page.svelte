<script>
    import About from "../../lib/subpages/about.svelte";
    import { backgroundColors } from "../../lib/stores";
    import handleCSSVariables from "../../lib/utils/css-variables";

    let backgroundColor = $backgroundColors.about
</script>

<div use:handleCSSVariables={{ backgroundColor }}>
    <About />
</div>

<style>
    div {
        background-color: var(--backgroundColor);
    }
</style>
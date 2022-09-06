<script>
  import { state, accentColors, backgroundColors } from "../stores";
  import { fade } from "svelte/transition";
  import About from "../subpages/about.svelte";
  import handleCSSVariables from "../utils/css-variables";

  export let name;

  let backgroundColor = $backgroundColors[$state];
  let accentColor = $accentColors[$state];
</script>

<div
  class="section-content {name}"
  use:handleCSSVariables={{ backgroundColor, accentColor }}
  in:fade={{ delay: 500 }}
  out:fade={{ duration: 250 }}
>
  <div class="flex-wrap {name}">
    <div
      class="section-content-div bordered"
    >
      <h2>
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
      <div class="button">
        <slot name="button" />
      </div>
    </div>
    <div class="section-content-div">
      <slot name="image" />
    </div>
  </div>

  {#if $state === "about"}
    <About />
  {/if}
</div>

<style lang="scss">
  p,
  h2,
  .button {
    margin: 0 10%;
  }

  h2 {
    color: var(--accentColor);
  }

  .button {
    display: flex;
    justify-content: flex-end;

    position: relative;
    top: 5%;
    right: 5%;

    @media screen and (max-width: 45rem) {
      justify-content: center;
      margin: 0 10%;
    }
  }

  .section-content {
    position: absolute;
    top: 26%;
    left: 0;
    right: 0;
    width: 100%;
    background-color: var(--backgroundColor);

    &.studio {
      top: 28%;
    }

    &.commissions {
      top: 34%;
    }

    &.shop {
      top: 44%;
      flex-direction: row-reverse;
    }

    &.news {
      top: 55%;
    }

    @media screen and (max-width: 45rem) {
      top: 35%;
    }
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    &.about {
      justify-content: space-between;
    }

    &.studio,
    &.shop {
      flex-direction: row-reverse;
    }

    @media screen and (max-width: 45rem) {
      flex-direction: column;
      row-gap: 5em;
    }
  }

  .section-content-div {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    row-gap: 1.5em;

    @media screen and (max-width: 45rem) {
      max-width: 100%;
    }
  }

  .bordered {
    box-sizing: border-box;
    border-top: solid 2px;
    border-bottom: solid 2px;
    border-radius: 5%;
    border-color: var(--accentColor);
    padding: 8em 0;
    max-width: 40%;
    margin: 0 auto;

    @media screen and (max-width: 45rem) {
      padding: 4em 0;
      max-width: 90%;
    }
  }
</style>

<script>
  import { state, accentColors, backgroundColors } from "../stores";
  import { fade } from "svelte/transition";
  import About from "../subpages/about.svelte";

  export let name;
</script>

<div
  class="homepage-section-content {name}"
  style="background: {$backgroundColors[$state]}"
  in:fade={{ delay: 500 }}
  out:fade={{ duration: 250 }}
>
  <div class="flex-wrap {name}">
    <div
      class="section-content-div bordered max-width-40"
      style="border-color: {$accentColors[$state]}"
    >
      <h2 style="color: {$accentColors[$state]}">
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

  {#if $state === "about"}
    <About />
  {/if}
</div>

<style lang="scss">
  p {
    margin: 0 10%;
  }

  h2 {
    margin: 0 10%;
  }

  .homepage-section-content {
    position: absolute;
    top: 26%;
    left: 0;
    right: 0;
    width: 100%;

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
    padding: 8em 0;

    @media screen and (max-width: 45rem) {
      padding: 4em 0;
    }
  }

  .max-width-40 {
    max-width: 40%;
    margin: 0 auto;

    @media screen and (max-width: 45rem) {
      max-width: 90%;
    }
  }
</style>

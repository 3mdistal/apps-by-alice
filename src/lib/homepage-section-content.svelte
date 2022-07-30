<script>
  import { state, accentColors } from "./stores";

  export let name;
  export let backgroundColor;

  import { fade } from "svelte/transition";
  import TopButton from "./top-button.svelte";
</script>

<TopButton />

<div
  class="homepage-section-content {name}"
  style="background: {backgroundColor}"
  in:fade={{ delay: 500 }}
  out:fade={{ duration: 250 }}
>
  <div
    class="section-content-div bordered max-width-40"
    style="border-color: {$accentColors[$state]}"
  >
    <h2 style="color: {accentColors[$state]}">
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

  .homepage-section-content {
    position: absolute;
    top: 26%;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  @media screen and (max-width: 440px) {
    .homepage-section-content {
      top: 35%;
    }
  }

  .homepage-section-content.about {
    justify-content: space-between;
  }

  .homepage-section-content.studio {
    top: 28%;
    flex-direction: row-reverse;
  }

  .homepage-section-content.commissions {
    top: 34%;
  }

  .homepage-section-content.shop {
    top: 44%;
    flex-direction: row-reverse;
  }

  .homepage-section-content.news {
    top: 55%;
  }

  @media screen and (max-width: 440px) {
    .section-content-div {
      max-width: 100%;
    }
  }
</style>

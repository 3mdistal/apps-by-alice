<script>
  import { state, accentColors, backgroundColors } from "../../stores";
  import { fade } from "svelte/transition";
  import handleCSSVariables from "../../utils/css-variables";
  import { timeline, spring } from "motion";
  import { onMount } from "svelte";
  import About from "../../subpages/about.svelte";
  import Commissions from "../../subpages/commissions.svelte";
  import Studio from "../../subpages/studio.svelte";

  let topHeading;
  let bordered;

  onMount(() => {
    const sequence = [
      [bordered, { x: [-200, 0] }, { duration: 1 }],
      [
        topHeading,
        { opacity: [0, 80, 90, 100], y: [-50, 0] },
        { easing: spring({ velocity: 1000, damping: 10 }) },
      ],
      [".top-text", { opacity: [0, 80, 100], y: [25, 0] }, { duration: 1 }],
      [".button", { opacity: [0, 100], x: [-100, 0] }, { duration: 0.75 }],
      [
        ".image-wrapper",
        { opacity: [0, 100], x: [100, 0] },
        { easing: "ease-in-out", duration: 2 },
      ],
    ];

    timeline(sequence);
  });

  export let name;

  let backgroundColor = $backgroundColors[$state];
  let accentColor = $accentColors[$state];
</script>

<div
  class="section-content {name} absolute md:top-[59%]"
  use:handleCSSVariables={{ backgroundColor, accentColor }} 
  in:fade={{ delay: 500 }}
  out:fade={{ duration: 250 }}
>
  <div class="flex-wrap {name} lg:px-20 px-5 flex flex-nowrap gap-x-10">
    <div
      bind:this={bordered}
      class="section-content-div bordered box-border border-y-2 rounded-[5%] py-20 px-5 lg:py-40 lg:px-20 max-w-[50%]"
      style="border-color: {$accentColors[$state]}"
    >
      <h2
        class="header-2 mb-5"
        style="color:{$accentColors[$state]}"
        bind:this={topHeading}
      >
        <slot name="heading" />
      </h2>
      {#if name == "shop"}
        <p class="top-text" style="color: #fafafa">
          <slot name="description" />
        </p>
      {:else}
        <p class="top-text">
          <slot name="description" />
        </p>
      {/if}
      <div class="flex justify-center md:justify-end mt-5 md:mr-5">
        <slot name="button" />
      </div>
    </div>
    <div class="section-content-div image-wrapper">
      <slot name="image" />
    </div>
  </div>

  {#if $state === "about"}
    <About />
  {:else if $state === "commissions"}
    <Commissions />
  {:else if $state === "studio"}
    <Studio />
  {/if}
</div>

<style lang="scss">
  .section-content {
    background-image: linear-gradient(
      transparent,
      var(--backgroundColor) 100px
    );

    &.studio {
      top: 63%;
    }

    &.commissions {
      top: 69%;
    }

    &.shop {
      top: 79%;
      flex-direction: row-reverse;
    }

    &.news {
      top: 93%;
    }

    @media screen and (max-width: 45rem) {
      top: 90%;

      &.studio {
        top: 83%;
      }

      &.commissions {
        top: 91%;
      }

      &.shop {
        top: 103%;
      }

      &.news {
        top: 113%;
      }
    }
  }

  .flex-wrap {
    overflow: hidden;

    &.about {
      justify-content: space-between;
    }

    &.studio,
    &.shop {
      flex-direction: row-reverse;
    }
  }
</style>

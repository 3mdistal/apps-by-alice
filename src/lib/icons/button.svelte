<script>
  import { onMount } from "svelte";
  import { state, accentColors, backgroundColors } from "../stores";

  export let url = "";
  export let text = "";
  export let target = "";
  export let type = "";

  let button;

  onMount(() => {
    button.style = `color: ${$accentColors[$state]}; border-color: ${$accentColors[$state]}; background-color: ${$backgroundColors[$state]};`;
  });

  function onMouseEnter() {
    button.style = `color: ${$backgroundColors[$state]}; border-color: ${$accentColors[$state]}; background-color: ${$accentColors[$state]};`;
  }

  function onMouseLeave() {
    button.style = `color: ${$accentColors[$state]}; border-color: ${$accentColors[$state]}; background-color: ${$backgroundColors[$state]};`;
  }
</script>

<a
  bind:this={button}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  href={url}
  {target}
  {type}
  class="text-l box-content cursor-pointer rounded-md border-2 p-[1em] text-center font-normal no-underline lg:text-xl"
>
  {text}
</a>

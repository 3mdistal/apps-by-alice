<script>
  import { backgroundColors, accentColors, state } from "../stores";
  import handleCSSVariables from "../utils/css-variables";

  const accentColor = $accentColors[$state];
  const backgroundColor = $backgroundColors[$state];

  export let url = "";
  export let text = "";
  export let target = "";
  export let type = "";
</script>

<a
  href={url}
  {target}
  {type}
  use:handleCSSVariables={{ accentColor, backgroundColor }}
  class="text-l box-content cursor-pointer rounded-md border-2 p-[1em] text-center font-normal no-underline lg:text-xl border-[{accentColor}] text-[{accentColor}] bg-[{backgroundColor}] hover:bg-[{accentColor}] hover:text-[{backgroundColor}]"
>
  {text}
</a>

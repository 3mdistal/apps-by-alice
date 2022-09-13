<script>
  import { backgroundColors, accentColors, state } from "../stores";
  import handleCSSVariables from "../utils/css-variables"

  const accentColor = $accentColors[$state];
  const backgroundColor = $backgroundColors[$state];

  export let url;
  export let text;
  export let target;
</script>

<a
  href={url}
  target={target}
  use:handleCSSVariables={{ accentColor, backgroundColor }}
>
  {text}
</a>

<style lang="scss">
  a {
    box-sizing: content-box;
    border-radius: 10px;
    border: none;
    padding: 1em;
    cursor: pointer;
    font-size: clamp(0.8rem, 1.2vw, 1.5rem);
    font-weight: 400;
    text-decoration: none;
    background-color: var(--backgroundColor);
    color: var(--accentColor);
    border: 2.5px solid;
    border-color: var(--accentColor);
    filter: brightness(96%);
  }

  a:hover, :focus {
    background-color: var(--accentColor);
    color: var(--backgroundColor);
  }
</style>

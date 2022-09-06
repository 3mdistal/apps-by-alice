<script>
  import { backgroundColors, accentColors, state } from "../stores";

  const accentColor = $accentColors[$state];
  const backgroundColor = $backgroundColors[$state];

  function cssVariables(node, variables) {
    setCssVariables(node, variables);

    return {
      update(variables) {
        setCssVariables(node, variables);
      },
    };
  }
  function setCssVariables(node, variables) {
    for (const name in variables) {
      node.style.setProperty(`--${name}`, variables[name]);
    }
  }

  export let url;
  export let text;
</script>

<a
  href={url}
  target="_blank"
  use:cssVariables={{ accentColor, backgroundColor }}
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

  a:hover {
    background-color: var(--accentColor);
    color: var(--backgroundColor);
  }
</style>

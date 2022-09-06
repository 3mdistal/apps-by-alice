<script>
    import { backgroundColors, accentColors, state } from "../stores"

    export let url
    export let text
</script>

<button href={url} style="background-color: {$accentColors[$state]}; color: {$backgroundColors[$state]}">
    {text}
</button>

<style>
  button {
    border-radius: 10px;
    border: none;
    padding: 1em;
    cursor: pointer;
    font-size: clamp(.8rem, 1.2vw, 1.5rem);
  }
</style>
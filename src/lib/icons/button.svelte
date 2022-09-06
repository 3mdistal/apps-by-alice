<script>
    import { backgroundColors, accentColors, state } from "../stores"

    export let url
    export let text
</script>

<a href={url} target="_blank" style="background-color: {$accentColors[$state]}; color: {$backgroundColors[$state]}">
    {text}
</a>

<style>
  a {
    border-radius: 10px;
    border: none;
    padding: 1em;
    cursor: pointer;
    font-size: clamp(.8rem, 1.2vw, 1.5rem);
    text-decoration: none;
  }
</style>
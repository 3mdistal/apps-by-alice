<script>
  export let url = "";
  export let text = "";
  export let target = "";
  export let type = "";
  export let accentColor = "";
  export let backgroundColor = "";
</script>

<a
  href={url}
  {target}
  {type}
  class="text-l box-content cursor-pointer rounded-md border-2 p-[1em] text-center font-normal no-underline lg:text-xl border-[{accentColor}] text-[{accentColor}] bg-[{backgroundColor}] hover:bg-[{accentColor}] hover:text-[{backgroundColor}]"
>
  {text}
</a>

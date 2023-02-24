<script lang="ts">
  import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";

  export let data;

  let {
    post: {
      results: [{ type, paragraph }],
    },
    post: { results },
  } = data;

  let title = type;
  let subtitle = type;
  let summary = type;
</script>

<ComingSoon
  data="{data}"
  title="{title}"
  subtitle="{subtitle}"
  summary="{summary}"
/>

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

<ComingSoon data="{data}">
  <svelte:fragment slot="title">{title}</svelte:fragment>
  <svelte:fragment slot="subtitle">{subtitle}</svelte:fragment>
  <svelte:fragment slot="summary">{summary}</svelte:fragment>
</ComingSoon>

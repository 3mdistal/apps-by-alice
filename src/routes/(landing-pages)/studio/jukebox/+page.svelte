<script>
  import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
  // @ts-ignore
  import ComingSoonJukebox from "$text/studio/jukebox/coming-soon-jukebox.md";
</script>

<ComingSoon>
  <svelte:fragment slot="title">jukebox</svelte:fragment>

  <svelte:fragment slot="subtitle">
    attempts at taming the cacophany of noise
  </svelte:fragment>

  <svelte:fragment slot="summary">
    I write music. Will be publishing here and to streaming services soon.
  </svelte:fragment>

  <svelte:fragment slot="text">
    <ComingSoonJukebox />
  </svelte:fragment>
</ComingSoon>

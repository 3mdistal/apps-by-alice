<script>
	import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
	import ComingSoonBlog from "../../../../cms/blog/coming-soon-blog.md";
</script>

<ComingSoon>
	<svelte:fragment slot="title">thoughts</svelte:fragment>

	<svelte:fragment slot="subtitle">
		from one spinning mind to another
	</svelte:fragment>

	<svelte:fragment slot="summary">
		I'll be booting up a fresh blog here soon.
	</svelte:fragment>

	<svelte:fragment slot="text">
		<ComingSoonBlog />
	</svelte:fragment>
</ComingSoon>

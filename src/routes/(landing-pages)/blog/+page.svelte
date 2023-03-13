<script lang="ts">
	import LandingPage from '$lib/subpages/landing-page.svelte';
	// @ts-ignore
	import Bird from '$images/blog/bird.png?webp';
	import Blog from '$lib/subpages/blog.svelte';
	import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

	export let data: { post: QueryDatabaseResponse };

	const accent = '#d1dce7';
	const background = '#838391';
</script>

<div style="background-color: {background}">
	<LandingPage
		header="unearth some thoughts."
		description="I'll be using the blog to keep you up to date on creative
        work, site revisions, and life updates. Check out the posts below!"
		src={Bird}
		alt="A painting of a colorful bird in flight."
		flexReverse
		{accent}
		textWhite
	/>
	<div class="mx-auto w-[90%] py-20 md:w-[60%]">
		<Blog {accent} {data} />
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	let notionImage;

	onMount(() => {
		notionImage.src = src;
	});
</script>

<img bind:this={notionImage} alt="" />

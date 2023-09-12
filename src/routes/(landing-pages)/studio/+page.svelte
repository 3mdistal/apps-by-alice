<script lang="ts">
	import StudioCard from './studio-card.svelte';

	const list = [
		{
			title: 'betson',
			subtitle: 'novel in calendar',
			logo: 'bet',
			src: '/src/cms/images/studio/mirror-b.jpg'
		},
		{
			title: 'these makeshift idiotika',
			subtitle: 'a shifting, tilting world',
			logo: 'tmi',
			src: '/src/cms/images/studio/bird-tmi.jpg'
		}
	];
</script>

<svelte:head>
	<title>Studio</title>
	<meta
		name="description"
		content="The studio works of Alice Alexandra Moore. Enjoy fiction, fantasy, poetry, illustrations, music, essays, and more."
	/>
</svelte:head>

<div class="bg-[#d6ddf0]">
	<!-- Menu Bar -->
	<div class="sticky top-0 z-20 flex h-[4.5rem] w-full items-center bg-[#243269] pl-8">
		<p class="text-2xl text-white">studio</p>
	</div>

	<!-- Break -->
	<div class="h-[3rem] w-full" />

	<!-- Cards -->
	<div
		class="flex flex-col flex-wrap items-center justify-center gap-12 bg-[#d6ddf0] sm:flex-row sm:justify-center sm:px-10"
	>
		{#each list as { title, subtitle, logo, src }}
			<StudioCard {title} {subtitle} {logo} {src} />
		{/each}
	</div>

	<div class="h-[3rem] w-full" />
</div>

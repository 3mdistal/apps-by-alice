<script lang="ts">
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import Menu from './menu.svelte';
	import Footer from './footer.svelte';
	import { currentScrollContainer } from '$lib/stores';
	import { onNavigate } from '$app/navigation';

	let main: HTMLElement;

	onNavigate(() => {
		main.scrollTo(0, 0);
	});

	onMount(() => {
		currentScrollContainer.set(main);

		fetch('/', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'LYm7iK3gwhoFu$aRE3XKtQZFqM@up5rW'
			}
		});
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;1,400;1,600&family=Sue+Ellen+Francisco&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main
	bind:this={main}
	class="h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden [&>*]:snap-start [&>*]:snap-always"
	style="--dark: #{$dark}; --midDark: #{$mid_dark}; --mid: #{$mid}; --midLight: #{$mid_light}; --light: #{$light};"
>
	<slot />
	<Menu />
	<Footer />
</main>

<script>
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import Menu from './menu.svelte';

	onMount(() => {
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

<body>
	<div
		style="--dark: #{$dark}; --midDark: #{$mid_dark}; --mid: #{$mid}; --midLight: #{$mid_light}; --light: #{$light};"
	>
		<slot />
		<Menu />
	</div>
</body>

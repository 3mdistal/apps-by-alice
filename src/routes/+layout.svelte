<script>
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import '../app.postcss';
	import Menu from './menu.svelte';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Bitter:ital@0;1&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=block"
		rel="stylesheet"
	/>
</svelte:head>

<div
	style="--dark: #{$dark}; --midDark: #{$mid_dark}; --mid: #{$mid}; --midLight: #{$mid_light}; --light: #{$light};"
>
	<slot />
	<Menu />
</div>

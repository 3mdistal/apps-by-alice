<script>
	import { dark, mid_dark, mid, mid_light, light } from '$lib/stores';
	import '../app.postcss';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	style="background-color: --dark: #{$dark}; --mid_dark: #{$mid_dark}; --mid: #{$mid}; --mid_light: #{$mid_light}; --light: #{$light};"
>
	<slot />
</div>

<style>
	div {
		background-color: var(--light);
	}

	:global(h1, p) {
		color: var(--dark);
	}

	:global(a) {
		color: var(--mid_dark);
	}
</style>

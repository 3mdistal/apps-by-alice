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
		href="https://fonts.googleapis.com/css2?family=Bitter:ital@0;1&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;1,6..12,300;1,6..12,400;1,6..12,600&display=swap"
		rel="preload"
		as="style"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Bitter:ital@0;1&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;1,6..12,300;1,6..12,400;1,6..12,600&display=swap"
		rel="stylesheet"
	/>

	<noscript>
		<link
			href="https://fonts.googleapis.com/css2?family=Bitter:ital@0;1&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;1,6..12,300;1,6..12,400;1,6..12,600&display=swap"
			rel="stylesheet"
		/>
	</noscript>
</svelte:head>

<div
	style="--dark: #{$dark}; --midDark: #{$mid_dark}; --mid: #{$mid}; --midLight: #{$mid_light}; --light: #{$light};"
>
	<slot />
	<Menu />
</div>

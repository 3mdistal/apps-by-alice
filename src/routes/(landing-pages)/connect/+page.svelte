<script>
	import Socials from '$lib/icons/socials.svelte';
	import LandingPage from '$lib/subpages/landing-page.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.backgroundColor = '#eeeded';
	});
</script>

<svelte:head>
	<title>Connect</title>
	<meta name="description" content="Social media links for Alice Alexandra Moore." />
</svelte:head>

<LandingPage
	header="let's keep in touch."
	description="Feel free to reach out to me on any of my socials!"
	accent="#726a12"
	background="#eeeded"
>
	<span slot="image">
		<Socials />
	</span>
</LandingPage>

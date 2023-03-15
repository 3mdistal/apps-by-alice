<script>
	import Socials from '$lib/icons/socials.svelte';
	import LandingPage from '$lib/subpages/landing-page.svelte';
</script>

<LandingPage
	header="let's keep in touch."
	description="Feel free to reach out to me on any of my socials."
	accent="#726a12"
	background="#eeeded"
>
	<span slot="image">
		<Socials />
	</span>
</LandingPage>

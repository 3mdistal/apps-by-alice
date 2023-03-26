<script>
	import LandingPage from '$lib/subpages/landing-page.svelte';
	import Studio from './studio.svelte';
	import Piano from '$images/studio/piano-with-chair.webp';

	const accent = '#243269';
	const background = '#d6ddf0';
</script>

<LandingPage
	header="i keep chasing new ideas."
	description="I've always been someone who dabbles in everything; learning
			new arts keeps me happy. In my studio, you'll find
			paintings, poems, songs, fiction, memoir, fantasy, and more."
	src={Piano}
	alt="A painting of an upright piano and empty wooden chair."
	{accent}
	{background}
	flexReverse
>
	<div id="works">
		<Studio {accent} {background} />
	</div>
</LandingPage>

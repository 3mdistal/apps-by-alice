<script>
	import '../app.scss';
	import Logo from '../cms/images/logo/logo.png';
	import OGImage from '$images/logo/OG-image.jpeg';
	import Svgs from '../lib/icons/svgs.svelte';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<link rel="icon" type="image" href={Logo} />
	<meta name="viewport" content="width=device-width" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap" rel="stylesheet" />
	<link rel="stylesheet" />

	<!-- HTML Meta Tags -->
	<title>Tempo Immaterial</title>
	<meta
		name="description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, commissions and more."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.alicealexandra.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Tempo Immaterial" />
	<meta
		property="og:description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, commissions and more."
	/>
	<meta property="og:image" content={OGImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="alicealexandra.com" />
	<meta property="twitter:url" content="https://www.alicealexandra.com" />
	<meta name="twitter:title" content="Tempo Immaterial" />
	<meta
		name="twitter:description"
		content="The studio of Alice Alexandra Moore. Creative work, ramblings, commissions and more."
	/>
	<meta name="twitter:image" content={OGImage} />

	<!-- Meta Tags Generated via https://www.opengraph.xyz -->
</svelte:head>

<Svgs />

<slot />

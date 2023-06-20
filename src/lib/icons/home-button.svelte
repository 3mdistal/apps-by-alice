<script lang="ts">
	import Logo from '$images/logo/logo.png?webp';
	import PlainCircle from '$images/logo/plain-circle.svg';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	// import AnalyticsConsent from '$lib/partials/analytics-consent.svelte';
	// import { analyticsCookie } from '$lib/stores';

	let button: HTMLAnchorElement;
	let logo: HTMLImageElement;
	let circle: HTMLDivElement;
	// let consentForm: HTMLDivElement;

	// function checkForCookie() {
	// 	const cookie = document.cookie
	// 		.split(';')
	// 		.find((cookie) => cookie.includes('analytics_consent'));
	// 	if (cookie) {
	// 		analyticsCookie.set(true);
	// 	} else {
	// 		analyticsCookie.set(false);
	// 	}
	// }

	function fadeIn() {
		const tl = gsap.timeline();
		tl.to(button, { opacity: 1, rotate: '360deg' });
		// .to(consentForm, { opacity: 1, duration: 0.5 });
	}

	function seeBack() {
		const tl = gsap.timeline();
		tl.to(logo, { rotateY: '180deg', opacity: 0 })
			.to(circle, { rotateY: '0deg', opacity: 1 }, '<')
			.to(circle.querySelector('p'), { opacity: 1, duration: 1 }, '<');
	}

	function hideBack() {
		const tl = gsap.timeline();
		tl.to(logo, { rotateY: '0deg', opacity: 1 })
			.to(circle, { rotateY: '-180deg', opacity: 0 }, '<')
			.to(circle.querySelector('p'), { opacity: 0, duration: 0.1 }, '<');
	}

	function populate() {
		fadeIn(), hideBack();
	}

	onMount(() => {
		populate();
		// if ($analyticsCookie === false) {
		// 	checkForCookie();
		// }
	});
</script>

<div class="fixed right-2 top-2 z-[100] flex items-center md:right-6 md:top-6">
	<a
		href="/"
		bind:this={button}
		class="h-14 w-14 opacity-0 md:h-20 md:w-20"
		on:mouseenter={seeBack}
		on:mouseleave={hideBack}
	>
		<img src={Logo} alt="Home button logo." class="absolute h-[100%] w-[100%]" bind:this={logo} />
		<div bind:this={circle} class="absolute flex h-[100%] w-[100%] items-center justify-center">
			<img src={PlainCircle} class="absolute h-[100%] w-[100%]" alt="Home button logo." />
			<p class="z-10 text-sm font-medium text-white md:text-xl">home.</p>
		</div>
	</a>
</div>
<!-- <div class="fixed bottom-6 flex justify-center sm:justify-end w-[100vw] md:right-6 z-[100]">
	{#if $analyticsCookie === false}
		<div bind:this={consentForm} class="opacity-0">
			<AnalyticsConsent />
		</div>
	{/if}
</div> -->

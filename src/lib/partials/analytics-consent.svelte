<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { setCookie, removeCookie, loadGoogleAnalytics } from './cookie-helpers';

	let consent: HTMLDivElement;

	function handleConsent(accepted: boolean) {
		if (accepted) {
			setCookie('analytics_consent', 'true', 365); // Remember the choice for 1 year
			loadGoogleAnalytics(); // Load Google Analytics if it hasn't been loaded
		} else {
			setCookie('analytics_consent', 'false', 365); // Remember the choice for 1 year
			removeCookie('_ga'); // Remove Google Analytics cookies
			removeCookie('_gid');
			removeCookie('_gat');
		}
		fold();
	}

	function fold() {
		const tl = gsap.timeline();
		tl.to(consent, { opacity: 0, duration: 0.5 });
	}

	onMount(() => {
		loadGoogleAnalytics();
	});
</script>

<div
	bind:this={consent}
	class="relative left-4 grid max-w-[60vw] grid-cols-5 grid-rows-1 items-center rounded-lg bg-white py-2 pl-4 pr-4 [&_a]:mx-4 [&_a]:rounded-lg [&_a]:text-lg"
>
	<p class="col-span-3 text-lg text-[#838391]">
		Can I chart how you browse my site to see patterns in my user base?
	</p>
	<a
		class="col-span-1 cursor-pointer border text-center text-[#838391] hover:bg-[#838391] hover:text-white"
		on:click|preventDefault={() => handleConsent(true)}
		href="/"
	>
		Yep
	</a>
	<a
		class="cursor-aointer col-span-1 border text-center text-[#838391] hover:bg-[#838391] hover:text-white"
		on:click|preventDefault={() => handleConsent(false)}
		href="/"
	>
		Nope
	</a>
</div>

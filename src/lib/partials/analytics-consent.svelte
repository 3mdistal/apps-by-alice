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
	class="grid grid-cols-2 grid-rows-2 items-center rounded-lg bg-white bg-opacity-90 py-4 pl-6 pr-4 sm:grid-cols-5 sm:grid-rows-1 [&_*]:text-sm xl:[&_*]:text-lg [&_a]:mx-8 [&_a]:rounded-lg [&_a]:py-1 sm:[&_a]:mx-4"
>
	<p class="col-span-3 mb-3 text-[#838391] sm:mb-0">
		Can I chart how you browse my site to see patterns in my user base?
	</p>
	<a
		class="col-span-1 cursor-pointer border border-[#838391] text-center text-[#838391] hover:bg-[#838391] hover:text-white"
		on:click|preventDefault={() => handleConsent(true)}
		href="/"
	>
		Yep
	</a>
	<a
		class="col-span-1 cursor-pointer border border-[#838391] text-center text-[#838391] hover:bg-[#838391] hover:text-white"
		on:click|preventDefault={() => handleConsent(false)}
		href="/"
	>
		Nope
	</a>
</div>

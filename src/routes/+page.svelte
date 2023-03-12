<script lang="ts">
	import HomepageWrapper from '../lib/homepage/homepage-wrapper.svelte';
	import SiteTitle from '../lib/homepage/site-title.svelte';
	import { state, backgroundColors } from '../lib/stores';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	function changeBackground(delay) {
		gsap.to(document.body, { backgroundColor: `${$backgroundColors[$state]}`, delay: delay });
	}

	function delay() {
		let duration = 1500;
		return {
			duration
		};
	}

	onMount(() => {
		state.set('home');
		changeBackground();
	});
</script>

<div out:delay class="relative h-[100dvh] flex-col overflow-hidden pt-4 md:pt-[6vh]">
	<SiteTitle />
	<HomepageWrapper {changeBackground} />
</div>

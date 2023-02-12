<script>
	import HomepageSection from "./homepage-section/homepage-section.svelte";
	import { state, backgroundColors, names } from "../stores";
	import gsap from "gsap";
	import { onMount } from "svelte";

	let homepageWrapper;

	function springIn() {
		state.set("home")
		gsap.from(homepageWrapper.children, {
			scaleY: 0.3,
			opacity: 0,
			ease: "elastic",
			duration: 2,
			delay: 1.5,
			stagger: 0.1,
		});
	}

	function transitionOut() {
		gsap.to(homepageWrapper, { y: "10vh", ease: "power4.out" })
	}

	onMount(() => {
		homepageWrapper.style.opacity = 1;
		springIn();
		
	});
</script>

<nav
	class="relative bottom-[-40px] h-[100vh] w-[100%] opacity-0"
	bind:this="{homepageWrapper}"
	out:transitionOut
>
	{#each $names as name}
		{#if $state == "home" || name}
			<HomepageSection
				color="{$backgroundColors[name]}"
				name="{name}"
			/>
		{/if}
	{/each}
</nav>

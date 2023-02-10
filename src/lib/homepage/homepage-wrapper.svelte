<script>
	import HomepageSection from "./homepage-section/homepage-section.svelte";
	import { state, backgroundColors, names } from "../stores";
	import gsap from "gsap";
	import { onMount } from "svelte";

	let homepageWrapper;

	function moveWrapperUp() {
		gsap.to(homepageWrapper, {
			y: "-100vh",
			delay: 0.15,
			ease: "power4.in",
		});
	}

	onMount(() => {
		homepageWrapper.style.opacity = 1;
		gsap.from(homepageWrapper.children, {
			scaleY: 0.3,
			opacity: 0,
			ease: "elastic",
			duration: 2,
			delay: 1.5,
			stagger: 0.1,
		});
	});
</script>

<div>
	<nav
		class="relative bottom-[-40px] h-[100vh] w-[100%] opacity-0"
		bind:this="{homepageWrapper}"
	>
		{#each $names as name}
			{#if $state == "home" || $state == name}
				<HomepageSection
					color="{$backgroundColors[name]}"
					name="{name}"
					moveWrapperUp="{moveWrapperUp}"
				/>
			{/if}
		{/each}
	</nav>
</div>

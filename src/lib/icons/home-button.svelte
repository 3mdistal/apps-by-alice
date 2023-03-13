<script lang="ts">
	import Logo from '$images/logo/logo.png?webp';
	import PlainCircle from '$images/logo/plain-circle.svg';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let button: HTMLAnchorElement;
	let logo: HTMLImageElement;
	let circle: HTMLDivElement;

	function fadeIn() {
		gsap.to(button, { opacity: 1, rotate: '360deg' });
	}

	function seeBack() {
		const tl = gsap.timeline();
		tl.to(logo, { rotateY: '180deg', opacity: 0 })
			.to(circle, { rotateY: '0deg', opacity: 1 }, '<')
			.to(circle.querySelector('p'), { opacity: 1, duration: 0.5 }, '<');
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
		setTimeout(populate, 1500);
	});
</script>

<a
	href="/"
	bind:this={button}
	class="fixed top-2 right-2 z-10 h-14 w-14 opacity-0 md:top-6 md:right-6 md:h-20 md:w-20"
	on:mouseenter={seeBack}
	on:mouseleave={hideBack}
>
	<img src={Logo} alt="Home button logo." class="absolute h-[100%] w-[100%]" bind:this={logo} />
	<div bind:this={circle} class="absolute flex h-[100%] w-[100%] items-center justify-center">
		<img src={PlainCircle} class="absolute h-[100%] w-[100%]" alt="Home button logo." />
		<p class="z-10 text-sm font-medium text-white md:text-xl">home.</p>
	</div>
</a>

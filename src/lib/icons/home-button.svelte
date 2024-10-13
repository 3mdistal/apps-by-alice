<script lang="ts">
	import Logo from '../../cms/images/logo/logo.png';
	import PlainCircle from '../../cms/images/logo/plain-circle.svg';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let button: HTMLAnchorElement;
	let logo: HTMLImageElement;
	let circle: HTMLDivElement;

	function fadeIn() {
		const tl = gsap.timeline();
		tl.to(button, { opacity: 1, rotate: '360deg' });
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
	});
</script>

<div class="home-button-container">
	<a
		href="/"
		bind:this={button}
		class="home-button"
		on:mouseenter={seeBack}
		on:mouseleave={hideBack}
	>
		<img src={Logo} alt="Home button logo." class="logo" bind:this={logo} />
		<div bind:this={circle} class="circle-container">
			<img src={PlainCircle} class="circle-image" alt="Home button logo." />
			<p class="home-text">home.</p>
		</div>
	</a>
</div>

<style>
	.home-button-container {
		display: flex;
		position: fixed;
		top: 0.5rem;
		right: 0.5rem;
		align-items: center;
		z-index: 100;
	}

	.home-button {
		opacity: 0;
		width: 3.5rem;
		height: 3.5rem;
	}

	.logo {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.circle-container {
		display: flex;
		position: absolute;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.circle-image {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.home-text {
		z-index: 10;
		color: white;
		font-weight: 500;
		font-size: 0.875rem;
	}

	@media (min-width: 768px) {
		.home-button-container {
			top: 1.5rem;
			right: 1.5rem;
		}

		.home-button {
			width: 5rem;
			height: 5rem;
		}

		.home-text {
			font-size: 1.25rem;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let title = '';
	export let subtitle = '';
	export let logo = '';
	export let src = '';
	export let alt = '';

	let card: HTMLDivElement;
	let front: HTMLDivElement;
	let back: HTMLDivElement;

	function fadeIn() {
		const tl = gsap.timeline();
		tl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 1 })
			.to(back, { rotateY: '-180deg' }, '<')
			.to(back, { opacity: 0, duration: 0.2 }, '<')
			.to(back.querySelector('p'), { opacity: 0, duration: 0.1 }, '<');
	}

	function seeBack() {
		const tl = gsap.timeline();
		tl.to(front, { scale: 0.9, duration: 0.1, ease: 'power3.in' })
			.to(back, { scale: 0.9, duration: 0.1, ease: 'power3.in' }, '<')
			.to(front, { rotateY: '180deg' })
			.to(front, { opacity: 0, duration: 0.2 }, '<')
			.to(back, { rotateY: '0deg' }, '<')
			.to(back, { opacity: 1, duration: 0.2 }, '<')
			.to(back, { scale: 1, duration: 0.3, ease: 'power3.in' }, '< .15')
			.to(front, { scale: 1, duration: 0.3, ease: 'power3.in' }, '<')
			.to(back.querySelector('p'), { opacity: 1 }, '<');
	}

	function hideBack() {
		const tl = gsap.timeline();
		tl.to(front, { scale: 0.9, duration: 0.1, ease: 'power3.in' })
			.to(back, { scale: 0.9, duration: 0.1, ease: 'power3.in' }, '<')
			.to(front, { rotateY: '0deg' })
			.to(front, { opacity: 1, duration: 0.2 }, '<')
			.to(back, { rotateY: '-180deg' }, '<')
			.to(back, { opacity: 0, duration: 0.2 }, '<')
			.to(back.querySelector('p'), { opacity: 0, duration: 0.1 }, '<')
			.to(back, { scale: 1, duration: 0.3, ease: 'power3.in' }, '< .15')
			.to(front, { scale: 1, duration: 0.3, ease: 'power3.in' }, '<');
	}

	onMount(() => {
		fadeIn();
	});
</script>

<div
	on:mouseenter={seeBack}
	on:mouseleave={hideBack}
	role="button"
	tabindex="0"
	aria-live="polite"
	class="relative flex aspect-[2/3] w-[20rem] justify-center overflow-hidden rounded-3xl border-2 border-white drop-shadow-2xl"
	bind:this={card}
>
	<div
		class="absolute flex h-full w-full flex-col items-center justify-center gap-y-16 rounded-3xl bg-[#243269]"
		bind:this={front}
	>
		<div
			class="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[50%] border-2 border-white bg-[#243269]"
		>
			<p class="font-logo text-[2.75rem] font-medium text-white">{logo}</p>
		</div>
		<div class="z-10">
			<p class="mb-6 text-center text-4xl tracking-[.15em] text-white">{title}</p>
			<p class="text-center text-2xl"><em class="text-white">{subtitle}</em></p>
		</div>
		<img {src} {alt} class="absolute h-full w-full opacity-30" />
	</div>

	<div
		class="absolute flex h-full w-full items-center justify-center rounded-3xl bg-[#243269] px-4 opacity-0"
		bind:this={back}
	>
		<p class="text 2xl text-white">
			A whole bunch of description text dynamically pulled from the server.
		</p>
	</div>

	<div class="relative -z-20 flex h-full">
		<div class="h-[5%] w-1 self-end bg-[#243269]"></div>
		<div class="h-[5%] w-1 self-start bg-[#243269]"></div>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { accentColors, backgroundColors } from '$lib/stores';
	import Button from '$lib/icons/button.svelte';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

	// Card Data
	export let card: PageObjectResponse;

	let {
		properties: {
			Title: {
				title: [{ plain_text: title }]
			},
			Subtitle: subtitle,
			'Shortened Logo Text': logo,
			Image: { url: src },
			ImageAlt: {
				rich_text: [
					{
						text: { content: alt }
					}
				]
			},
			Description: description,
			ButtonText: {
				rich_text: [
					{
						text: { content: buttonText }
					}
				]
			},
			Destination: { url }
		}
	} = card as unknown as {
		properties: {
			Title: {
				title: [{ plain_text: string }];
			};
			// eslint-disable-next-line
			Subtitle: any;
			// eslint-disable-next-line
			'Shortened Logo Text': any;
			Image: { url: string };
			ImageAlt: {
				rich_text: [
					{
						text: { content: string };
					}
				];
			};
			// eslint-disable-next-line
			Description: any;
			ButtonText: {
				rich_text: [
					{
						text: { content: string };
					}
				];
			};
			Destination: { url: string };
		};
	};

	// UI Elements
	let front: HTMLDivElement;
	let back: HTMLDivElement;
	let backText: HTMLParagraphElement;
	let spinPoles: HTMLDivElement;

	// State Variables
	let loading = false;
	let frontOrBack = 'front';

	// Animation Timelines
	function seeBackTimeline() {
		// Animation sequence for showing the back of the card
		const tl = gsap.timeline();
		tl.to(back, { scale: 1, duration: 0.01 })
			.to(front, { scale: 0.96, duration: 0.1, ease: 'power4.easeIn' }, '<')
			.to(back, { scale: 0.96, duration: 0.1, ease: 'power4.easeIn' }, '<')
			.to(front, { rotateY: '180deg', ease: 'power4.easeOut' }, '<')
			.to(front, { opacity: 0, duration: 0.2, ease: 'power4.easeIn' }, '<')
			.to(back, { rotateY: '0deg', ease: 'power4.easeIn' }, '<')
			.to(back, { opacity: 1, duration: 0.2, ease: 'power4.easeOut' }, '<')
			.to(back, { scale: 1, duration: 0.3, ease: 'power3.easeOut' }, '< .15')
			.to(front, { scale: 1, duration: 0.3, ease: 'power3.easeOut' }, '<')
			.to(backText, { opacity: 1 }, '<');

		return tl.paused(true);
	}

	function seeBackTimelineMotionReduced() {
		const tl = gsap.timeline();
		tl.to(back, { scale: 1, duration: 0 })
			.to(spinPoles, { opacity: 0, duration: 0 })
			.to(back.children, { opacity: 0, duration: 0 })
			.to(back, { rotateY: '0deg', duration: 0 })
			.to(back, { opacity: 1 }, '<')
			.to(front.children, { opacity: 0 }, '<')
			.to(back.children, { opacity: 1 });

		return tl.paused(true);
	}

	function hideBackTimeline() {
		// Animation sequence for hiding the back of the card
		const tl = gsap.timeline();
		tl.to(front, { scale: 0.9, duration: 0.2, ease: 'power4.easeOut' })
			.to(back, { scale: 0.9, duration: 0.2, ease: 'power4.easeOut' }, '<')
			.to(front, { rotateY: '0deg', duration: 0.3 }, 0.15)
			.to(front, { opacity: 1, duration: 0.2 }, '<')
			.to(back, { rotateY: '-180deg', duration: 0.2, ease: 'power4.easeOut' }, '<')
			.to(back, { opacity: 0, duration: 0.2 }, '<')
			.to(backText, { opacity: 0, duration: 0.1 }, '<')
			.to(back, { scale: 1, duration: 0.05, ease: 'power4.easeIn' }, 0.2)
			.to(front, { scale: 1, duration: 0.1, ease: 'power4.easeIn' }, '<')
			.to(back, { scale: 0.01, duration: 0.1 });

		return tl.paused(true);
	}

	function hideBackTimelineMotionReduced() {
		const tl = gsap.timeline();
		tl.to(back.children, { opacity: 0 })
			.to(front.children, { opacity: 1 })
			.to(front.querySelector('.opacity-80'), { opacity: 0.8 }, '<')
			.to(back, { opacity: 0 }, '<')
			.to(back, { scale: 0.01, duration: 0 });

		return tl.paused(true);
	}

	// Event Handlers
	let prefersReducedMotion: MediaQueryList;

	function reset() {
		// Reset the card to its initial state
		const tl = gsap.timeline();
		tl.to(back, { rotateY: '-180deg' }, '<')
			.to(back, { opacity: 0, duration: 0.2 }, '<')
			.to(backText, { opacity: 0, duration: 0 }, '<');

		return tl;
	}

	function seeBack() {
		// Show the back of the card
		if (frontOrBack === 'back') return;
		frontOrBack = 'back';

		if (loading === true) return;

		if (prefersReducedMotion.matches) {
			seeBackTimelineMotionReduced().play();
			return;
		}

		seeBackTimeline().play();
		return;
	}

	function hideBack() {
		// Hide the back of the card
		if (frontOrBack === 'front') return;
		frontOrBack = 'front';

		if (loading === true) return;

		if (prefersReducedMotion.matches) {
			hideBackTimelineMotionReduced().play();
			return;
		}

		setTimeout(() => hideBackTimeline().play(), 200);
		return;
	}

	function handleClickMessage(e) {
		// Handle click events from the button
		loading = e.detail.click;
	}

	function handleFocusMessage(e) {
		// Handle focus events from the button
		if (e.detail.focus === true) {
			seeBack();
		} else if (e.detail.focus === false) {
			hideBack();
		}
	}

	// Lifecycle Events
	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		reset().play();
	});
</script>

<div
	on:mouseenter={seeBack}
	on:mouseleave={hideBack}
	role="button"
	tabindex="0"
	aria-live="polite"
	aria-expanded="false"
	class="relative flex aspect-[2/3] w-[20rem] cursor-default justify-center overflow-hidden rounded-3xl border-2 border-white drop-shadow-2xl"
>
	<!-- Front of Card -->
	<div
		class="bg-studio absolute flex h-full w-full flex-col items-center justify-center gap-y-16 overflow-hidden rounded-3xl"
		bind:this={front}
	>
		<div
			class="bg-studio relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[50%] border-2 border-white"
		>
			<p class="font-logo text-[2.75rem] font-medium text-white"><TextMacro type={logo} /></p>
		</div>
		<div class="z-10">
			<h2 class="mb-6 text-center text-4xl font-light tracking-[.15em] text-white">{title}</h2>
			<p class="text-center text-2xl"><em class="text-white"><TextMacro type={subtitle} /></em></p>
		</div>
		<img {src} {alt} class="absolute h-full w-full opacity-80" />
		<div
			class="from-studio absolute h-full w-full bg-gradient-to-t to-transparent opacity-80"
		></div>
	</div>

	<!-- Back of Card -->
	<div
		class="bg-studio absolute flex h-full w-full flex-col items-center justify-around rounded-3xl px-4 py-24 opacity-0 sm:py-10"
		bind:this={back}
		aria-labelledby="popover"
		aria-expanded="true"
	>
		<p bind:this={backText} class="text 2xl">
			<em class="text-white"><TextMacro type={description} /></em>
		</p>

		{#if loading}
			<Button
				text="please hold..."
				accent={$accentColors.studio}
				background={$backgroundColors.studio}
			/>
		{:else}
			<Button
				{url}
				text={buttonText}
				accent={$backgroundColors.studio}
				background={$accentColors.studio}
				on:clickMessage={handleClickMessage}
				on:focusMessage={handleFocusMessage}
			/>
		{/if}
	</div>

	<!-- Spin Poles -->
	<div bind:this={spinPoles} class="relative -z-20 flex h-full">
		<div class="bg-studio h-[5%] w-1 self-end"></div>
		<div class="bg-studio h-[5%] w-1 self-start"></div>
	</div>
</div>

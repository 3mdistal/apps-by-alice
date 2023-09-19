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
			Subtitle: any;
			'Shortened Logo Text': any;
			Image: { url: string };
			ImageAlt: {
				rich_text: [
					{
						text: { content: string };
					}
				];
			};
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

	// State Variables
	let loading = false;
	let frontOrBack = 'front';

	// Animation Timelines
	function seeBackTimeline() {
		// Animation sequence for showing the back of the card
		const tl = gsap.timeline();
		tl.to(back, { scale: 1, duration: 0.01 })
			.to(front, { scale: 0.9, duration: 0.1, ease: 'power4.easeIn' }, '<')
			.to(back, { scale: 0.9, duration: 0.1, ease: 'power4.easeIn' }, '<')
			.to(front, { rotateY: '180deg', ease: 'power4.easeIn' }, '<')
			.to(front, { opacity: 0, duration: 0.2, ease: 'power4.easeIn' }, '<')
			.to(back, { rotateY: '0deg', ease: 'power4.easeOut' }, '<')
			.to(back, { opacity: 1, duration: 0.2, ease: 'power4.easeOut' }, '<')
			.to(back, { scale: 1, duration: 0.3, ease: 'power3.easeOut' }, '< .15')
			.to(front, { scale: 1, duration: 0.3, ease: 'power3.easeOut' }, '<')
			.to(backText, { opacity: 1 }, '<');

		return tl;
	}

	function hideBackTimeline() {
		// Animation sequence for hiding the back of the card
		console.log('hiding');
		const tl = gsap.timeline();
		tl.to(front, { scale: 0.9, duration: 0.15, ease: 'power4.easeInOut' })
			.to(back, { scale: 0.9, duration: 0.15, ease: 'power4.easeInOut' }, '<')
			.to(front, { rotateY: '0deg' })
			.to(front, { opacity: 1, duration: 0.2 }, '<')
			.to(back, { rotateY: '-180deg', ease: 'power4.easeOut' }, '<')
			.to(back, { opacity: 0, duration: 0.2 }, '<')
			.to(backText, { opacity: 0, duration: 0.1 }, '<')
			.to(back, { scale: 1, duration: 0.3, ease: 'power4.easeOut' }, '< .25')
			.to(front, { scale: 1, duration: 0.3, ease: 'power4.easeOut' }, '<')
			.to(back, { scale: 0.01, duration: 0.01 });

		return tl;
	}

	// Event Handlers
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

		seeBackTimeline().play();
	}

	function hideBack() {
		// Hide the back of the card
		if (frontOrBack === 'front') return;
		frontOrBack = 'front';

		if (loading === true) return;
		hideBackTimeline().play();
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
		reset().play();
	});
</script>

<div
	on:mouseenter={seeBack}
	on:mouseleave={hideBack}
	role="spinbutton"
	tabindex="0"
	aria-live="polite"
	class="relative flex aspect-[2/3] w-[20rem] cursor-default justify-center overflow-hidden rounded-3xl border-2 border-white drop-shadow-2xl"
>
	<!-- Front of Card -->
	<div
		class="absolute flex h-full w-full flex-col items-center justify-center gap-y-16 overflow-hidden rounded-3xl bg-studio"
		bind:this={front}
	>
		<div
			class="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[50%] border-2 border-white bg-studio"
		>
			<p class="font-logo text-[2.75rem] font-medium text-white"><TextMacro type={logo} /></p>
		</div>
		<div class="z-10">
			<h2 class="mb-6 text-center text-4xl font-light tracking-[.15em] text-white">{title}</h2>
			<p class="text-center text-2xl"><em class="text-white"><TextMacro type={subtitle} /></em></p>
		</div>
		<img {src} {alt} class="absolute h-full w-full opacity-60" />
		<div
			class="absolute h-full w-full bg-gradient-to-t from-studio to-transparent opacity-50"
		></div>
	</div>

	<!-- Back of Card -->
	<div
		class="absolute flex h-full w-full flex-col items-center justify-around rounded-3xl bg-studio px-4 py-24 opacity-0 sm:py-10"
		bind:this={back}
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
	<div class="relative -z-20 flex h-full">
		<div class="h-[5%] w-1 self-end bg-studio"></div>
		<div class="h-[5%] w-1 self-start bg-studio"></div>
	</div>
</div>

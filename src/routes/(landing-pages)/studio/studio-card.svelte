<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { onDestroy } from 'svelte';
	import { state, accentColors, backgroundColors } from '$lib/stores';
	import Button from '$lib/icons/button.svelte';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
	import { fade } from 'svelte/transition';

	export let title = '';
	export let subtitle: { rich_text: TextRichTextItemResponse[] };
	export let logo: { rich_text: TextRichTextItemResponse[] };
	export let src = '';
	export let alt = '';
	export let description: { rich_text: TextRichTextItemResponse[] };
	export let url = '';
	export let buttonText = '';

	let loading = false;

	let card: HTMLDivElement;
	let front: HTMLDivElement;
	let back: HTMLDivElement;

	function reset() {
		const tl = gsap.timeline();
		tl.to(back, { rotateY: '-180deg' }, '<')
			.to(back, { opacity: 0, duration: 0.2 }, '<')
			.to(back.querySelector('p'), { opacity: 0, duration: 0.1 }, '<');
	}

	function seeBack() {
		if (loading) return;
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
		if (loading) return;
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
		reset();
	});

	onDestroy(() => {
		state.set('home');
	});

	function handleMessage(e) {
		loading = e.detail.loading;
	}
</script>

<div
	on:mouseenter={seeBack}
	on:mouseleave={hideBack}
	role="button"
	tabindex="0"
	aria-live="polite"
	class="relative flex aspect-[2/3] w-[20rem] cursor-default justify-center overflow-hidden rounded-3xl border-2 border-white drop-shadow-2xl"
	bind:this={card}
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
			<p class="mb-6 text-center text-4xl tracking-[.15em] text-white">{title}</p>
			<p class="text-center text-2xl"><em class="text-white"><TextMacro type={subtitle} /></em></p>
		</div>
		<img {src} {alt} class="absolute h-full w-full opacity-60" />
		<div
			class="absolute h-full w-full bg-gradient-to-t from-studio to-transparent opacity-50"
		></div>
	</div>

	<!-- Back of Card -->
	<div
		class="absolute flex h-full w-full flex-col items-center justify-around rounded-3xl bg-studio px-4 py-10 opacity-0"
		bind:this={back}
	>
		<p class="text 2xl">
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
				on:message={handleMessage}
			/>
		{/if}
	</div>

	<!-- Spin Poles -->
	<div class="relative -z-20 flex h-full">
		<div class="h-[5%] w-1 self-end bg-studio"></div>
		<div class="h-[5%] w-1 self-start bg-studio"></div>
	</div>
</div>

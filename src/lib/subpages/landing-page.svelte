<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { state } from '../stores';

	export let src = '';
	export let alt = '';
	export let header = '';
	export let description = '';
	export let noPadding = false;
	export let flexReverse = false;
	export let accent = '';
	export let background = '';
	export let textWhite = false;

	let container: HTMLDivElement;
	let bordered: HTMLDivElement;
	let topHeading: HTMLHeadingElement;
	let descriptor: HTMLParagraphElement;
	let button: HTMLDivElement;
	let imageWrapper: HTMLDivElement;

	function transitionIn() {
		const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
		tl.to(container.children, { opacity: 1, duration: 0 })
			.from(bordered, { x: -200 })
			.from(topHeading, { opacity: 0, y: -50 }, '0')
			.from(descriptor, { opacity: 0, y: 25, duration: 0.25 }, '>')
			.from(button, { opacity: 0, scale: 0.6, duration: 0.25 }, '<')
			.from(imageWrapper, { opacity: 0, scale: 1.5 }, '0');

		return tl;
	}

	onMount(() => {
		transitionIn();
	});

	onDestroy(() => {
		state.set('home');
	});
</script>

<div bind:this={container} class="pt-40 [&>*]:opacity-0" style="background-color: {background}">
	<div
		class="flex flex-wrap items-center gap-x-10 gap-y-10 px-5 md:flex-nowrap lg:px-20 {noPadding
			? 'justify-between'
			: 'justify-center'} {flexReverse ? 'flex-row-reverse' : ''} "
	>
		<div
			bind:this={bordered}
			class="sm:px-15 box-border rounded-[5%] border-y-2 px-10 py-20 md:basis-1/2 lg:px-20 lg:py-40"
			style="border-color: {accent}"
		>
			<h2 bind:this={topHeading} class="mb-5" style="color: {accent}">
				{header}
			</h2>

			<p bind:this={descriptor} class={textWhite ? 'text-white' : ''}>
				{description}
			</p>

			<div bind:this={button} class="mr-5 mt-10 flex justify-end">
				<slot name="button" />
			</div>
		</div>

		{#if src}
			<div
				bind:this={imageWrapper}
				class="basis aspect-square md:basis-1/2 {noPadding ? 'mr-[-20px] lg:mr-[-80px]' : ''}"
			>
				<img {src} {alt} class="object-contain" />
			</div>
		{:else}
			<div bind:this={imageWrapper} class="mb-10 md:mb-0 md:ml-20 md:basis-1/3">
				<slot name="image" />
			</div>
		{/if}
	</div>

	<slot />
</div>

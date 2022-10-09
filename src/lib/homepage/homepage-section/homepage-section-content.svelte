<script>
	import { state, accentColors, backgroundColors } from '../../stores';
	import { fade } from 'svelte/transition';
	import { timeline, spring } from 'motion';
	import { onMount } from 'svelte';
	import About from '../../subpages/about.svelte';
	import Commissions from '../../subpages/commissions.svelte';
	import Studio from '../../subpages/studio.svelte';

	let topHeading;
	let bordered;
	let button;
	let imageWrapper;

	onMount(() => {
		const sequence = [
			[bordered, { x: [-200, 0] }, { duration: 1 }],
			[
				topHeading,
				{ opacity: [0, 80, 90, 100], y: [-50, 0] },
				{ easing: spring({ velocity: 1000, damping: 10 }) }
			],
			[bordered.querySelector('p'), { opacity: [0, 80, 100], y: [25, 0] }, { duration: 1 }],
			[button, { opacity: [0, 100], x: [-100, 0] }, { duration: 0.75 }],
			[imageWrapper, { opacity: [0, 100], x: [100, 0] }, { easing: 'ease-in-out', duration: 2 }]
		];

		timeline(sequence);
	});
</script>

<div
	class="absolute top-[90%] md:top-[59%]
    {$state === 'studio'
		? 'top-[83%] md:top-[63%]'
		: $state === 'commissions'
		? 'top-[91%] md:top-[69%]'
		: $state === 'shop'
		? 'top-[103%] md:top-[79%]'
		: $state === 'news'
		? 'top-[113%] md:top-[93%]'
		: ''}"
	style="background-image: linear-gradient(transparent, {$backgroundColors[$state]} 100px)"
	in:fade={{ delay: 500 }}
	out:fade={{ duration: 250 }}
>
	<div
		class="flex flex-wrap items-center justify-center gap-x-10 gap-y-10 overflow-hidden px-5 md:flex-nowrap lg:px-20 
    {$state == 'studio'
			? 'flex-row-reverse'
			: $state === 'shop'
			? 'flex-row-reverse'
			: $state === 'about'
			? 'justify-between'
			: ''}"
	>
		<div
			bind:this={bordered}
			class="box-border rounded-[5%] border-y-2 py-20 px-5 sm:max-w-[90%] md:max-w-[50%] lg:py-40 lg:px-20"
			style="border-color: {$accentColors[$state]}"
		>
			<h2 class="header-2 mb-5" style="color:{$accentColors[$state]}" bind:this={topHeading}>
				<slot name="heading" />
			</h2>

			<p class={$state === 'shop' ? 'text-[#fafafa]' : ''}>
				<slot name="description" />
			</p>

			<div bind:this={button} class="mt-5 flex justify-center md:mr-5 md:justify-end">
				<slot name="button" />
			</div>
		</div>
		<div bind:this={imageWrapper} class={$state === 'about' ? 'lg:mr-[-80px] mr-[-20px]' : ''}>
			<slot name="image" />
		</div>
	</div>

	{#if $state === 'about'}
		<About />
	{:else if $state === 'commissions'}
		<Commissions />
	{:else if $state === 'studio'}
		<Studio />
	{/if}
</div>

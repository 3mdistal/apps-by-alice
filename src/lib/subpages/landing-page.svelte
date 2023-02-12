<script>
	import gsap from "gsap";
	import { onMount } from "svelte";

	export let src = "";
	export let alt = "";
	export let header = "";
	export let description = "";
	export let noPadding = false;
	export let flexReverse = false;
	export let accent = "";
	export let background = "";
	export let textWhite = false;

	let bordered;
	let topHeading;
	let descriptor;
	let button;
	let imageWrapper;
	let container;

	function transitionIn() {
		const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
		tl.to(container.children, { opacity: 1, duration: 0 })
			.from(bordered, { x: -200 })
			.from(topHeading, { opacity: 0, y: -50 }, "0")
			.from(descriptor, { opacity: 0, y: 25, duration: 0.25 }, ">")
			.from(button, { opacity: 0, scale: 0.6, duration: 0.25 }, "<")
			.from(imageWrapper, { opacity: 0, scale: 1.5 }, "0");

		return tl;
	}

	onMount(() => {
		setTimeout(transitionIn, 1500);
	});
</script>

<div
	bind:this="{container}"
	class="[&>*]:opacity-0 pt-40 pb-20 min-h-[100vh]"
	style="background-color: {background}"
>
	<div
		class="flex flex-wrap items-center gap-x-10 gap-y-10 px-5 md:flex-nowrap lg:px-20 {noPadding
			? 'justify-between'
			: 'justify-center'} {flexReverse ? 'flex-row-reverse' : ''} "
	>
		<div
			bind:this="{bordered}"
			class="box-border rounded-[5%] border-y-2 py-20 px-5 md:basis-1/2 lg:py-40 lg:px-20"
			style="border-color: {accent}"
		>
			<h2
				bind:this="{topHeading}"
				class="header-2 mb-5"
				style="color: {accent}"
			>
				{header}
			</h2>

			<p bind:this="{descriptor}" class="{textWhite ? 'text-white' : ''}">
				{description}
			</p>

			<div bind:this="{button}" class="mt-10 mr-5 flex justify-end">
				<slot name="button" />
			</div>
		</div>

		{#if src}
			<div
				bind:this="{imageWrapper}"
				class="basis aspect-square md:basis-1/2 {noPadding
					? 'mr-[-20px] lg:mr-[-80px]'
					: ''}"
			>
				<img src="{src}" alt="{alt}" class="object-contain" />
			</div>
		{:else}
			<div bind:this="{imageWrapper}" class="basis">
				<slot name="image" />
			</div>
		{/if}
	</div>

	<slot />
</div>

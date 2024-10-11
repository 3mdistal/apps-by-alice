<script>
	import { createEventDispatcher } from 'svelte';

	export let url = '';
	export let text = '';
	export let target = '';
	export let type = '';
	export let accent = '';
	export let background = '';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('clickMessage', { click: true });
	}

	function handleFocus() {
		dispatch('focusMessage', { focus: true });
	}

	function handleBlur() {
		dispatch('focusMessage', { focus: false });
	}
</script>

<a
	href={url}
	{target}
	{type}
	class="text-l box-content cursor-pointer rounded-xl border-2 p-[1em] text-center font-normal no-underline lg:text-xl"
	style="--accent: {accent}; --background: {background}"
	on:click={handleClick}
	on:focus={handleFocus}
	on:blur={handleBlur}
>
	{text}
</a>

<style lang="scss">
	a {
		background-color: var(--background);
		color: var(--accent);
		border-color: var(--accent);

		&:hover {
			background-color: var(--accent);
			color: var(--background);
		}
	}
</style>

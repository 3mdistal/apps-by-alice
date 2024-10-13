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
	style="--accent: {accent}; --background: {background}"
	on:click={handleClick}
	on:focus={handleFocus}
	on:blur={handleBlur}
>
	{text}
</a>

<style>
	a {
		background-color: var(--background);
		color: var(--accent);
		border-color: var(--accent);
		font-size: 1rem;
		box-sizing: content-box;
		cursor: pointer;
		border-radius: 0.75rem;
		border-width: 2px;
		border-style: solid;
		padding: 1em;
		text-align: center;
		font-weight: 400;
		text-decoration: none;
	}

	a:hover {
		background-color: var(--accent);
		color: var(--background);
	}

	@media (min-width: 1024px) {
		a {
			font-size: 1.25rem;
		}
	}
</style>

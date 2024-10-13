<script lang="ts">
	import Socials from '$lib/icons/socials.svelte';
	import { onDestroy } from 'svelte';
	import { state } from '$lib/stores';

	let loading = false;
	let visibility = true;
	let email: string;

	async function subscribe(event: Event) {
		loading = true;
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		const response = await fetch('/connect', {
			method: 'POST',
			body: data
		});

		if (response.ok) {
			visibility = false;
			loading = false;
		}

		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		}
	}

	onDestroy(() => {
		state.set('home');
	});
</script>

<svelte:head>
	<title>Connect</title>
	<meta name="description" content="Social media links for Alice Alexandra Moore." />
</svelte:head>

<div class="container">
	<h2>let's keep in touch.</h2>
	<p>My monthly newsletter highlights what I've been up to:</p>
	<div class="newsletter">
		{#if visibility}
			{#if loading}
				<p>Submitting your info . . .</p>
			{:else}
				<form on:submit|preventDefault={subscribe} class="subscribe-form">
					<label for="email" class="hidden">Your email:</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						name="email"
						required
						placeholder="queen.doe@gmail.com"
						class="email-input"
					/>
					<button class="subscribe-button">Subscribe</button>
				</form>
			{/if}
		{:else}
			<p>
				Thank you for subscribing! You will receive the monthly newsletter at <span
					class="email-highlight">{email}</span
				>.
			</p>
		{/if}
	</div>
	<div class="spacer"></div>
	<p class="socials-text">Or you can always reach out to me on one of my socials:</p>
	<div class="socials-container">
		<Socials />
	</div>
</div>

<style>
	.container {
		min-height: 100lvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #eeeded;
		padding: 5rem 1rem;
	}

	h2 {
		color: #726a12;
	}

	.newsletter {
		margin-top: 1.25rem;
	}

	.subscribe-form {
		display: grid;
		max-width: 400px;
		grid-template-columns: 2fr 1fr;
		gap: 0.5rem;
	}

	.email-input {
		width: 100%;
		padding: 0.25rem 1.25rem;
		font-size: 1rem;
	}

	.subscribe-button {
		width: 100%;
		background-color: #726a12;
		color: white;
		padding: 0.25rem 1.25rem;
		font-size: 1rem;
	}

	.email-highlight {
		font-weight: 500;
		color: #726a12;
	}

	.spacer {
		height: 5rem;
	}

	.socials-text {
		margin-bottom: 1.25rem;
	}

	.socials-container {
		max-width: 800px;
	}

	@media (min-width: 768px) {
		.email-input,
		.subscribe-button {
			font-size: 1.25rem;
		}
	}
</style>

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

<div class="min-h-[100lvh] flex-col items-center justify-center bg-[#eeeded] px-4 py-20 md:flex">
	<h2 class="text-[#726a12]">let's keep in touch.</h2>
	<p>My monthly newsletter highlights what I've been up to:</p>
	<div class="mt-5">
		{#if visibility}
			{#if loading}
				<p>Submitting your info . . .</p>
			{:else}
				<form on:submit|preventDefault={subscribe} class="grid max-w-[400px] grid-cols-3 gap-x-2">
					<label for="email" class="hidden">Your email:</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						name="email"
						required
						placeholder="queen.doe@gmail.com"
						class="col-span-2 w-full px-5 py-1 md:text-xl"
					/>
					<button class="w-full bg-[#726a12] px-5 py-1 text-white md:text-xl">Subscribe</button>
				</form>
			{/if}
		{:else}
			<p>
				Thank you for subscribing! You will receive the monthly newsletter at <span
					class="font-medium text-[#726a12]">{email}</span
				>.
			</p>
		{/if}
	</div>
	<div class="h-20" />
	<p class="mb-5">Or you can always reach out to me on one of my socials:</p>
	<div class="max-w-[800px]">
		<Socials />
	</div>
</div>

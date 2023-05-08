<script lang="ts">
	import Socials from '$lib/icons/socials.svelte';
	let loading = false;
	let visibility = true;
	let email: string;

	async function subscribe(event: Event) {
		loading = true;
		const form = event.target;
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
</script>

<svelte:head>
	<title>Connect</title>
	<meta name="description" content="Social media links for Alice Alexandra Moore." />
</svelte:head>

<div class="bg-[#eeeded] min-h-[100lvh] px-4 py-20 md:flex flex-col items-center justify-center">
	<h2 class="text-[#726a12]">let's keep in touch.</h2>
	<p>My monthly newsletter highlights what I've been up to:</p>
	<div class="mt-5">
		{#if visibility}
			{#if loading}
				<p>Submitting your info . . .</p>
			{:else}
				<form on:submit|preventDefault={subscribe} class="grid grid-cols-3 gap-x-2 max-w-[400px]">
					<label for="email" class="hidden">Your email:</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						name="email"
						required
						placeholder="queen.doe@gmail.com"
						class="px-5 py-1 w-full col-span-2 md:text-xl"
					/>
					<button class="px-5 py-1 bg-[#726a12] text-white w-full md:text-xl">Subscribe</button>
				</form>
			{/if}
		{:else}
			<p>
				Thank you for subscribing! You will receive the monthly newsletter at <span
					class="text-[#726a12] font-medium">{email}</span
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

<!-- <LandingPage
	header="let's keep in touch."
	description="Feel free to reach out to me on any of my socials!"
	accent="#726a12"
	background="#eeeded"
>
	<span slot="image">
		<Socials />
	</span>
</LandingPage> -->

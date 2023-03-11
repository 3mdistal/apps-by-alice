<script lang="ts">
	export let accent: string;

	let visibility = true;
	let loading = false;
	let client: string;
	let email: string;

	async function contact(event: Event) {
		loading = true;
		const form = event.target;
		const data = new FormData(form);

		const response = await fetch('/commissions', {
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

{#if visibility}
	{#if loading}
		<div
			class="md:py-[30%] py-[50%] font-medium [&_*]:font-medium [&_*]:text-xl md:[&_*]:text-3xl [&>*]:text-inherit text-[#642e1a]"
		>
			<p class="mb-4">Submitting your info . . .</p>
		</div>
	{:else}
		<form on:submit|preventDefault={contact} method="POST">
			<p class="text-dynamicHeader text-center mb-[1em]" style="color: {accent}">
				Let's make something together.
			</p>
			<div class="form-flex">
				<div class="item-flex">
					<label for="name" style="color: {accent}">Preferred Name:</label>
					<input type="text" bind:value={client} name="name" id="name" required />
				</div>
				<div class="item-flex">
					<label for="email" style="color: {accent}">Email or Best Contact:</label>
					<input type="email" bind:value={email} name="email" id="email" required />
				</div>
				<div class="item-flex">
					<label for="description" style="color: {accent}">Project Description:</label>
					<textarea id="description" name="description" rows="4" required />
				</div>
				<button
					type="submit"
					class="text-l box-content w-20 rounded-md border-2 border-[#642e1a] p-[1em] font-medium text-[#642e1a] brightness-95 hover:bg-[#642e1a] hover:text-[#dcc9c6] md:text-xl"
					>Submit.</button
				>
			</div>
		</form>
	{/if}
{:else}
	<div
		class="md:py-[30%] py-[50%] font-medium [&_*]:font-medium [&_*]:text-xl md:[&_*]:text-3xl [&>*]:text-inherit text-[#642e1a]"
	>
		<p class="mb-4">
			Thank you, <span class="text-amber-700">{client}</span>, for your submission!
		</p>
		<p>
			I'll be in touch shortly to <span class="text-amber-700">{email}</span>.
		</p>
	</div>
{/if}

<style lang="scss">
	form {
		& .form-flex {
			display: flex;
			flex-direction: column;
			row-gap: 2em;

			& .item-flex {
				display: flex;
				flex-direction: column;
				width: 80%;

				& label {
					font-size: clamp(1rem, 1.5vw, 2rem);
					font-weight: 400;
					color: var(--accentColor);
				}

				& textarea {
					min-width: 100%;
					max-width: 100%;
				}
			}
		}
	}
</style>

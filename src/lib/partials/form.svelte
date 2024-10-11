<script lang="ts">
	export let accent: string;

	let formDisplay = true;
	let loadingDisplay = false;
	let submittedDisplay = false;
	let errorDisplay = false;
	let errorText: string;
	let client: string;
	let email: string;

	async function contact(event: Event) {
		formDisplay = false;
		loadingDisplay = true;
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		const response = await fetch('/commissions', {
			method: 'POST',
			body: data
		});

		if (response.ok) {
			loadingDisplay = false;
			submittedDisplay = true;
		}

		if (!response.ok) {
			loadingDisplay = false;
			errorDisplay = true;
			const message = `An error has occurred: ${response.status}`;
			errorText = message;
			throw new Error(message);
		}
	}
</script>

{#if formDisplay}
	<form on:submit|preventDefault={contact} method="POST">
		<p class="mb-[1em] text-center text-dynamicHeader" style="color: {accent}">
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
{:else if loadingDisplay}
	<div
		class="py-[50%] font-medium text-[#642e1a] md:py-[30%] [&>*]:text-inherit [&_*]:text-xl [&_*]:font-medium md:[&_*]:text-3xl"
	>
		<p class="mb-4">Submitting your info . . .</p>
	</div>
{:else if submittedDisplay}
	<div
		class="py-[50%] font-medium text-[#642e1a] md:py-[30%] [&>*]:text-inherit [&_*]:text-xl [&_*]:font-medium md:[&_*]:text-3xl"
	>
		<p class="mb-4">
			Thank you, <span class="text-amber-700">{client}</span>, for your submission!
		</p>
		<p>
			I'll be in touch shortly to <span class="text-amber-700">{email}</span>.
		</p>
	</div>
{:else if errorDisplay}
	<div
		class="py-[50%] font-medium text-[#642e1a] md:py-[30%] [&>*]:text-inherit [&_*]:text-xl [&_*]:font-medium md:[&_*]:text-3xl"
	>
		<p class="mb-4">An error has occurred: <span class="text-amber-700">{errorText}</span></p>
		<p>Please try again later.</p>
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

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
		<p class="form-header" style="color: {accent}">Let's make something together.</p>
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
			<button type="submit" class="submit-button">Submit.</button>
		</div>
	</form>
{:else if loadingDisplay}
	<div class="message-container">
		<p class="message">Submitting your info . . .</p>
	</div>
{:else if submittedDisplay}
	<div class="message-container">
		<p class="message">
			Thank you, <span class="highlight">{client}</span>, for your submission!
		</p>
		<p class="message">
			I'll be in touch shortly to <span class="highlight">{email}</span>.
		</p>
	</div>
{:else if errorDisplay}
	<div class="message-container">
		<p class="message">An error has occurred: <span class="highlight">{errorText}</span></p>
		<p class="message">Please try again later.</p>
	</div>
{/if}

<style>
	form {
		& .form-flex {
			display: flex;
			row-gap: 2em;
			flex-direction: column;

			& .item-flex {
				display: flex;
				flex-direction: column;
				width: 80%;

				& label {
					color: var(--accentColor);
					font-weight: 400;
					font-size: clamp(1rem, 1.5vw, 2rem);
				}

				& textarea {
					min-width: 100%;
					max-width: 100%;
				}
			}
		}
	}

	.form-header {
		margin-bottom: 1em;
		font-size: var(--dynamic-header);
		text-align: center;
	}

	.submit-button {
		filter: brightness(0.95);
		box-sizing: content-box;
		border: 2px solid #642e1a;
		border-radius: 0.375rem;
		padding: 1em;
		width: 5rem;
		color: #642e1a;
		font-weight: 500;
		font-size: 1rem;
	}

	.submit-button:hover {
		background-color: #642e1a;
		color: #dcc9c6;
	}

	.message-container {
		padding-top: 50%;
		padding-bottom: 50%;
		color: #642e1a;
		font-weight: 500;
	}

	.message {
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 1.25rem;
	}

	.highlight {
		color: #b45309;
	}

	@media (min-width: 768px) {
		.submit-button {
			font-size: 1.25rem;
		}

		.message-container {
			padding-top: 30%;
			padding-bottom: 30%;
		}

		.message {
			font-size: 1.875rem;
		}
	}
</style>

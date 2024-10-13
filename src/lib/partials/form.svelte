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

	.form-header {
		margin-bottom: 1em;
		text-align: center;
		font-size: var(--dynamic-header);
	}

	.submit-button {
		font-size: 1rem;
		box-sizing: content-box;
		width: 5rem;
		border-radius: 0.375rem;
		border: 2px solid #642e1a;
		padding: 1em;
		font-weight: 500;
		color: #642e1a;
		filter: brightness(0.95);
	}

	.submit-button:hover {
		background-color: #642e1a;
		color: #dcc9c6;
	}

	.message-container {
		padding-top: 50%;
		padding-bottom: 50%;
		font-weight: 500;
		color: #642e1a;
	}

	.message {
		margin-bottom: 1rem;
		font-size: 1.25rem;
		font-weight: 500;
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

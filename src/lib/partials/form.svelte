<script>
	export let accent;

	let form = true;
</script>

{#if form}
	<form method="POST" action="/form">
		<p class="heading" style="color: {accent}">
			Let's make something together.
		</p>
		<p style="margin-top: -1.5em; margin-bottom: 2em">
			This form is not currently working. Please reach out to me on social
			media, or from the button at the top of the commissions section.
		</p>
		<div class="form-flex">
			<div class="item-flex">
				<label for="name" style="color: {accent}">Preferred Name:</label
				>
				<input type="text" id="name" required />
			</div>
			<div class="item-flex">
				<label for="email" style="color: {accent}"
					>Email or Best Contact:</label
				>
				<input type="email" id="email" required />
			</div>
			<div class="item-flex">
				<label for="description" style="color: {accent}"
					>Project Description:</label
				>
				<textarea id="description" rows="4" required></textarea>
			</div>
			<button
				type="submit"
				class="text-l box-content w-20 rounded-md border-2 border-[#642e1a] p-[1em] font-medium text-[#642e1a] brightness-95 hover:bg-[#642e1a] hover:text-[#dcc9c6] md:text-xl"
				>Submit.</button
			>
		</div>
	</form>
{:else}
	<p class="heading" style="margin-top: 20%;">
		Thank you for your submission! I'll be in touch shortly.
	</p>
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

	.heading {
		font-size: clamp(1.5rem, 3vw, 4rem);
		text-align: center;
		margin-bottom: 1em;
	}
</style>

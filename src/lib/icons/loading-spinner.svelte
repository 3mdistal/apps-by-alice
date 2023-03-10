<div class="w-[20ch] md:w-[55ch] aspect-video flex justify-center items-center md:pr-[10ch]">
	<div class="loader" />
</div>

<style>
	.loader {
		border: 8px solid #f3f3f3;
		border-top: 8px solid #545454;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

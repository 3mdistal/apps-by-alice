<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	class="h-[100%] min-h-[100vh] bg-black px-4 py-10 tracking-wide text-white sm:px-10 [&_*]:text-inherit"
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
>
	<h1 class="mb-2 text-5xl text-white md:text-7xl">
		<slot name="title" />
	</h1>
	<p class="mb-[1em] max-w-[25ch] text-2xl md:text-4xl">
		<em>
			<slot name="subtitle" />
		</em>
	</p>
	<hr class="mx-10 my-10 opacity-50" />
	<p>
		<em class="mr-4 font-medium text-white">tl;dr</em>
		<slot name="summary" />
	</p>
	<hr class="mx-10 my-10 opacity-50" />
	<div class="max-w-[60ch] text-xl lg:text-2xl [&_*]:text-inherit [&_p]:mb-[1em]">
		<slot name="text" />
	</div>
	<p class="text-right text-4xl md:text-6xl">
		<a href="/studio#works" class="inline-block p-6 text-white">back.</a>
	</p>
</div>

<style lang="scss">
	* {
		color: #e1e1e1;
	}
</style>

<script>
	import IMDB from '$lib/svg/imdb.svelte';
	import Instagram from '$lib/svg/instagram.svelte';
	import Vimeo from '$lib/svg/vimeo.svelte';

	function getCurrentYear() {
		const year = new Date().getFullYear();
		return year;
	}
</script>

<div class="flex h-[100dvh] w-screen items-center justify-center bg-[var(--midDark)] px-4 md:px-80">
	<div
		class="grid min-h-[500px] w-full place-content-center place-items-center gap-y-28 rounded-2xl bg-[var(--midLight)] pt-10 sm:h-[75%] sm:min-h-[700px] sm:min-w-[600px] sm:gap-y-40 sm:pt-20"
	>
		<div class="grid place-items-center gap-y-4 sm:gap-y-10">
			<h2 class="text-[var(--midDark)]">Get in touch.</h2>
			<div
				class="grid max-w-[150px] grid-cols-3 place-items-center gap-x-4 sm:max-w-[250px] [&_path]:fill-[var(--midDark)] [&_path]:duration-100 [&_path]:hover:[&_a]:fill-[var(--mid)]"
			>
				<a href="https://www.instagram.com/anthropotpourri/">
					<Instagram />
				</a>
				<a href="https://imdb.me/shoroukelkobrsi">
					<IMDB />
				</a>
				<a href="https://vimeo.com/shoroukelkobrsi">
					<Vimeo />
				</a>
			</div>
		</div>

		<!-- Desktop Version -->
		<p class="hidden text-center text-[1rem] text-[var(--midDark)] xl:block">
			© Shorouk Elkobrsi {getCurrentYear()}. All Rights Reserved. <span class="mx-4">|</span> Site
			by
			<a
				class="relative bottom-[.2em] font-['Allison_Script'] text-[1.5rem] text-[var(--midDark)]"
				href="https://alicealexandra.com">Alice Alexandra Moore</a
			>
		</p>

		<!-- Mobile Version -->
		<div class="xl:hidden">
			<p class="mb-2 text-center text-[.75rem] text-[var(--midDark)] sm:text-[1rem]">
				© Shorouk Elkobrsi {getCurrentYear()}. All Rights Reserved.
			</p>
			<p class="text-center text-[.75rem] text-[var(--midDark)] sm:text-[1rem]">
				Site by
				<a
					class="relative bottom-[.2em] font-['Allison_Script'] text-[1.25rem] text-[var(--midDark)] sm:text-[1.5rem]"
					href="https://alicealexandra.com">Alice Alexandra Moore</a
				>
			</p>
		</div>
	</div>
</div>

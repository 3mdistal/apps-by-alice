<script>
	import IMDB from '$lib/svg/imdb.svelte';
	import Instagram from '$lib/svg/instagram.svelte';
	import Vimeo from '$lib/svg/vimeo.svelte';

	function getCurrentYear() {
		const year = new Date().getFullYear();
		return year;
	}
</script>

<div class="grid min-h-screen w-screen place-items-center bg-[var(--midDark)] px-4 sm:px-80">
	<div
		class="sm:max-h- grid h-full max-h-[60%] w-full place-content-center place-items-center gap-y-28 rounded-2xl bg-[var(--midLight)] pt-10 sm:max-h-[75%] sm:gap-y-40 sm:pt-20"
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
		<p class="hidden text-center text-xl text-[var(--midDark)] sm:block">
			© Shorouk Elkobrsi {getCurrentYear()}. All Rights Reserved. <span class="mx-4">|</span> Site
			by
			<a
				class="relative bottom-[.2em] font-['Allison_Script'] text-2xl text-[var(--midDark)]"
				href="https://alicealexandra.com">Alice Alexandra Moore</a
			>
		</p>

		<!-- Mobile Version -->
		<div class="sm:hidden">
			<p class="mb-2 text-center text-sm text-[var(--midDark)]">
				© Shorouk Elkobrsi {getCurrentYear()}. All Rights Reserved.
			</p>
			<p class="text-center text-sm text-[var(--midDark)]">
				Site by
				<a
					class="relative bottom-[.2em] font-['Allison_Script'] text-2xl text-[var(--midDark)]"
					href="https://alicealexandra.com">Alice Alexandra Moore</a
				>
			</p>
		</div>
	</div>
</div>

<script lang="ts">
	import { menuOpen } from '$lib/stores';

	function handleMenuOpen(e: KeyboardEvent | MouseEvent | TouchEvent) {
		if (
			(e instanceof KeyboardEvent && e.key == 'Enter') ||
			e instanceof MouseEvent ||
			e instanceof TouchEvent
		) {
			menuOpen.set(true);
		}
		return;
	}

	function handleMenuClose(e: KeyboardEvent | MouseEvent) {
		if ((e instanceof KeyboardEvent && e.key == 'Enter') || e instanceof MouseEvent) {
			menuOpen.set(false);
		}
		return;
	}
</script>

{#if $menuOpen}
	<div
		id="menu-open"
		class="fixed top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-y-[8%] bg-[var(--midLight)] [&_a]:cursor-pointer [&_p]:font-serif [&_p]:text-6xl [&_p]:italic [&_p]:text-[var(--midDark)] hover:[&_p]:text-[var(--mid)]"
	>
		<a href="./#home" on:click={handleMenuClose}>
			<p>home</p>
		</a>
		<a href="./#studio" on:click={handleMenuClose}>
			<p>studio</p>
		</a>
		<a href="/#about" on:click={handleMenuClose}>
			<p>about</p>
		</a>
	</div>

	<div
		class="fixed right-8 top-8 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--midDark)]"
		on:keydown={handleMenuClose}
		on:pointerdown={handleMenuClose}
		role="button"
		tabindex="0"
	>
		<p class="text-center font-serif text-3xl italic text-[var(--midDark)]">a</p>
	</div>
{:else}
	<div
		class="fixed right-8 top-8 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--light)]"
		on:pointerdown={handleMenuOpen}
		on:keydown={handleMenuOpen}
		role="button"
		tabindex="0"
	>
		<p class="text-center font-serif text-3xl italic text-[var(--light)]">a</p>
	</div>
{/if}

<script lang="ts">
	import { menuOpen } from '$lib/stores';
	import { tick } from 'svelte';

	let scrollPosition = 0;

	function handleMenuOpen(e: KeyboardEvent | MouseEvent | TouchEvent) {
		if (
			(e instanceof KeyboardEvent && e.key == 'Enter') ||
			e instanceof MouseEvent ||
			e instanceof TouchEvent
		) {
			scrollPosition = window.scrollY;
			menuOpen.set(true);
			window.addEventListener('popstate', () => handleMenuClose(e));
		}
		return;
	}

	function handleMenuClose(e: KeyboardEvent | MouseEvent | TouchEvent | PopStateEvent) {
		if (shouldCloseMenu(e)) {
			closeMenu(e);
			scroll();
		}
	}

	function shouldCloseMenu(e: KeyboardEvent | MouseEvent | TouchEvent | PopStateEvent): boolean {
		return (
			(e instanceof KeyboardEvent && e.key == 'Enter') ||
			e instanceof PointerEvent ||
			e instanceof TouchEvent ||
			e instanceof PopStateEvent
		);
	}

	function closeMenu(e: KeyboardEvent | MouseEvent | TouchEvent | PopStateEvent) {
		menuOpen.set(false);
		if (e.target instanceof HTMLAnchorElement) {
			return;
		}
		if (e instanceof PopStateEvent) {
			window.removeEventListener('popstate', () => handleMenuClose(e));
		}
	}

	async function scroll() {
		await tick();
		window.scrollTo(0, scrollPosition);
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
		on:click={handleMenuClose}
		role="button"
		tabindex="0"
	>
		<p class="text-center font-serif text-3xl italic text-[var(--midDark)]">a</p>
	</div>
{:else}
	<div
		class="fixed right-8 top-8 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--light)]"
		on:click={handleMenuOpen}
		on:keydown={handleMenuOpen}
		role="button"
		tabindex="0"
	>
		<p class="text-center font-serif text-3xl italic text-[var(--light)]">a</p>
	</div>
{/if}

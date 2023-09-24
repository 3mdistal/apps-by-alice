<script lang="ts">
	import { menuOpen } from '$lib/stores';

	function handleMenuOpen(e: KeyboardEvent | MouseEvent) {
		if ((e instanceof KeyboardEvent && e.key == 'Enter') || e instanceof MouseEvent) {
			menuOpen.set(true);
		}
		return;
	}
</script>

{#if $menuOpen}
	<div
		id="menu-open"
		class="fixed top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-y-[8%] bg-[var(--dark)] [&_a]:cursor-pointer [&_p]:font-serif [&_p]:text-6xl [&_p]:italic [&_p]:text-[var(--light)] hover:[&_a]:[&_p]:text-[var(--mid)]"
	>
		<a href="./#home" on:click={() => menuOpen.set(false)}>
			<p>home</p>
		</a>
		<a href="./#studio" on:click={() => menuOpen.set(false)}>
			<p>studio</p>
		</a>
		<a href="/#about" on:click={() => menuOpen.set(false)}>
			<p>about</p>
		</a>
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

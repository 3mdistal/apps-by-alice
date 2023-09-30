<script lang="ts">
	import { homepageOpen, menuOpen } from '$lib/stores';
	import { tick } from 'svelte';
	import gsap from 'gsap';
	import CameraLogo from '$lib/svg/camera-logo.svelte';

	let scrollPosition = 0;

	let openMenu: HTMLDivElement;

	const handlePopState = (e: PopStateEvent) => handleMenuClose(e);

	async function handleMenuOpen(e: KeyboardEvent | MouseEvent | TouchEvent) {
		if (
			(e instanceof KeyboardEvent && e.key == 'Enter') ||
			e instanceof MouseEvent ||
			e instanceof TouchEvent
		) {
			scrollPosition = window.scrollY;
			menuOpen.set(true);
			await tick();
			menuOpenAnimation()
				.play()
				.eventCallback('onComplete', () => {
					homepageOpen.set(false);
				});
			window.addEventListener('popstate', handlePopState);
			history.pushState(null, '');
		}
		return;
	}

	function handleMenuClose(e: KeyboardEvent | MouseEvent | TouchEvent | PopStateEvent) {
		if (shouldCloseMenu(e)) {
			closeMenu(e);
			scroll(e);
		}
	}

	function shouldCloseMenu(e: KeyboardEvent | MouseEvent | TouchEvent | PopStateEvent): boolean {
		return (
			(e instanceof KeyboardEvent && e.key == 'Enter') ||
			e instanceof MouseEvent ||
			e instanceof TouchEvent ||
			e instanceof PopStateEvent
		);
	}

	function closeMenu(e?: KeyboardEvent | MouseEvent | TouchEvent | PopStateEvent) {
		if (e instanceof PopStateEvent) {
			e.preventDefault();
		}

		window.removeEventListener('popstate', handlePopState);

		homepageOpen.set(true);
		menuCloseAnimation()
			.play()
			.eventCallback('onComplete', () => menuOpen.set(false));
	}

	async function scroll(e: Event) {
		await tick();
		window.scrollTo(0, scrollPosition);
	}

	function menuOpenAnimation() {
		const tl = gsap.timeline();
		tl.fromTo(openMenu, { y: '-100vh' }, { y: '0vh', duration: 0.3, ease: 'power1.out' });

		return tl.paused(true);
	}

	function menuCloseAnimation() {
		const tl = gsap.timeline();
		tl.to(openMenu, { y: '-100vh', duration: 0.3, ease: 'power1.in' });

		return tl.paused(true);
	}
</script>

{#if $menuOpen}
	<div
		id="menu-open"
		class="fixed top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-y-[8%] bg-[var(--midLight)] lg:gap-y-[16%] [&_a]:cursor-pointer [&_p]:select-none [&_p]:font-['Allison_Script'] [&_p]:text-6xl [&_p]:italic [&_p]:text-[var(--midDark)] [&_p]:transition-all [&_p]:duration-200 hover:[&_p]:text-[var(--mid)] lg:[&_p]:text-[5rem]"
		bind:this={openMenu}
	>
		<a href="/" on:click={handleMenuClose}>
			<p>home</p>
		</a>
		<a href="/films" on:click={handleMenuClose}>
			<p>films</p>
		</a>
		<a href="/about" on:click={handleMenuClose}>
			<p>about</p>
		</a>
	</div>

	<div
		class="fixed right-0 top-0 z-10 flex h-20 w-20 items-center justify-center rounded-full hover:scale-105 sm:h-32 sm:w-32"
		on:keydown={handleMenuClose}
		on:click={handleMenuClose}
		role="button"
		tabindex="0"
	>
		<CameraLogo fill="var(--midDark)" hoverFill="var(--dark)" />
	</div>
{:else}
	<div
		class="fixed right-0 top-0 z-10 flex h-20 w-20 items-center justify-center rounded-full sm:h-32 sm:w-32"
		on:click={handleMenuOpen}
		on:keydown={handleMenuOpen}
		role="button"
		tabindex="0"
	>
		<CameraLogo fill="var(--midLight)" hoverFill="var(--light)" />
	</div>
{/if}

<style>
	* {
		transition: none;
		transition-property: color, background-color, border-color, text-decoration-color;
		transition-duration: 700ms;
		transition-timing-function: ease-in-out;
	}
</style>

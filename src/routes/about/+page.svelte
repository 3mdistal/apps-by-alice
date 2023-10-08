<script lang="ts">
	import Slide from './slide.svelte';

	const logos = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

	const entries = [
		{
			heading: 'My name is Shorouk',
			imgSrc: 'https://unsplash.it/1200/1200',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		},
		{
			heading: 'This is my about page',
			imgSrc: 'https://unsplash.it/1500/1500',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		},
		{
			heading: 'You learned about me',
			imgSrc: 'https://unsplash.it/1100/1100',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		},
		{
			heading: 'Because I am the best',
			imgSrc: 'https://unsplash.it/1300/1300',
			imgAlt: 'A picture of me',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?'
		}
	];

	let currentSlide = 0;
	let showSlide = 0; // intermediate state
	let scrollLock = 0;

	const changeSlide = (e: WheelEvent) => {
		const direction = e.deltaY > 0 ? 1 : -1;

		currentSlide += direction;

		if (currentSlide < 0) currentSlide = 0;
		if (currentSlide > entries.length - 1) currentSlide = entries.length - 1;

		showSlide = currentSlide;

		setTimeout(() => {
			scrollLock = currentSlide;
		}, 2000);
	};

	function throttle(func: Function, delay: number) {
		let lastCall = 0;
		return (...args: any[]) => {
			const now = new Date().getTime();
			if (now - lastCall < delay) {
				return;
			}
			lastCall = now;
			return func(...args);
		};
	}

	function handleScroll(e: WheelEvent) {
		if (Math.abs(e.deltaY) < 10) {
			e.preventDefault();
		}

		const direction = e.deltaY > 0 ? 1 : -1;
		if ((direction > 0 && scrollLock < entries.length - 1) || (direction < 0 && scrollLock > 0)) {
			e.preventDefault();
		}
	}

	const throttledChangeSlide = throttle(changeSlide, 1250);
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<main
	class="h-[100svh] snap-y snap-mandatory overflow-y-scroll bg-[var(--dark)] px-4 text-[var(--midLight)] [&>*]:snap-start [&>*]:snap-always"
>
	<!-- Intro -->
	<div class="flex h-[100svh] max-w-[90%] flex-col items-center justify-center gap-y-4">
		<h1 class="text-8xl">Shorouk <br /> Elkobrsi</h1>
		<!-- todo: Make dynamic ethos text. -->
		<p class="max-w-[40ch]">
			Ethos: Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente
			laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio
			voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?
		</p>
	</div>

	<!-- Slideshow -->
	<div class="h-[100svh] overflow-hidden" on:wheel={throttledChangeSlide} on:wheel={handleScroll}>
		{#key showSlide}
			<Slide
				heading={entries[showSlide].heading}
				src={entries[showSlide].imgSrc}
				alt={entries[showSlide].imgAlt}
				text={entries[showSlide].text}
			/>
		{/key}
	</div>

	<!-- Logo Wall -->
	<div class="flex h-[100svh] max-w-[90%] flex-col items-center justify-center gap-y-10">
		<h2>People who gave me their trust:</h2>
		<!-- todo: put wall here -->
		<div class="grid grid-cols-3 gap-x-2 gap-y-6 [&_img]:rounded-lg">
			{#each logos as logo}
				<img src="https://unsplash.it/500/200" alt={logo} />
			{/each}
		</div>
	</div>
</main>

<div class="hidden">
	{#each entries as entry}
		<img src={entry.imgSrc} alt="" />
	{/each}
</div>

<script>
	import Slide from './slide.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<main
	class="flex flex-col items-center justify-center bg-[var(--dark)] px-4 text-[var(--midLight)]"
>
	<!-- Intro -->
	<div class="flex min-h-[100svh] max-w-[90%] flex-col items-center justify-center gap-y-4">
		<h1 class="text-8xl">Shorouk <br /> Elkobrsi</h1>
		<!-- todo: Make dynamic ethos text. -->
		<p class="max-w-[40ch]">
			Ethos: Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum, sapiente
			laboriosam, minus sint, eos quos a porro optio iure neque in repudiandae distinctio
			voluptatibus obcaecati molestiae. Quas, voluptatibus accusantium?
		</p>
	</div>

	<!-- Slideshow -->
	<Slide src={`https://unsplash.it/1200/1200`} />
	<Slide src={`https://unsplash.it/1000/1000`} />
	<Slide src={`https://unsplash.it/1100/1100`} />
</main>

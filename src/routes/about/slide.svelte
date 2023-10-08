<script>
	export let src = 'https://unsplash.it/1000/1000';
	export let headline = 'A sample headline';
	export let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam quidem est dolorem
		tempora? Sequi, quasi dolor. Harum animi ab similique, magnam aliquid sint, in quaerat, hic
		veritatis provident assumenda?`;
</script>

<div class="flex h-[100svh] max-w-[90%] flex-col items-center justify-center">
	<div class="mb-10 h-[40%]">
		<img class="h-full w-full rounded-2xl" {src} alt="" />
	</div>
	<h2 class="text-center">{headline}</h2>
	<p class="max-w-[30ch] text-[1rem]">
		{text}
	</p>
</div>

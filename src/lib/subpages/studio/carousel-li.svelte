<script>
	export let src = '';
	export let alt = '';
	export let title = '';
	export let subtitle = '';
</script>

<li
	class="group relative flex h-[100%] w-[100%] grow basis-0 list-none flex-col items-center justify-center object-cover transition-all duration-700 ease-in-out hover:grow-[8] md:w-auto"
>
	<img {src} {alt} class="absolute z-0 w-[100%]" />
	<div
		class="invisible z-10 h-[100%] w-[100%] bg-black bg-opacity-50 px-10 py-5 opacity-0 transition-all duration-700 group-hover:visible group-hover:opacity-100 md:h-auto md:w-auto"
	>
		<p
			class="text-sm font-thin text-white transition-all duration-700 group-hover:text-3xl md:group-hover:text-4xl"
		>
			{title}
		</p>
		<p class="text-sm text-white transition-all duration-700 md:group-hover:text-2xl">{subtitle}</p>
	</div>
</li>

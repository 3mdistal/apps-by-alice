<script>
	import { replaceSpaces } from '$lib/helpers';

	export let studioGalleryResult;

	let {
		properties: {
			Colors: {
				rich_text: [{ plain_text: colors }]
			},
			Cover: {
				rich_text: [{ plain_text: cover }]
			},
			Date: {
				rich_text: [{ plain_text: date }]
			},
			Logline: {
				rich_text: [{ plain_text: logline }]
			},
			Name: {
				title: [{ plain_text: name }]
			},
			Root: {
				rich_text: [{ plain_text: root }]
			}
		}
	} = studioGalleryResult;

	let imageSrc =
		'https://ik.imagekit.io/tempoimmaterial/anthropotpourri/studio/' +
		replaceSpaces(root) +
		'/' +
		replaceSpaces(cover) +
		'?tr=w-1000,q-50';

	console.log(imageSrc);
</script>

<div
	class="w-[550px] rounded-2xl px-10 py-32 transition-all duration-500 ease-out hover:bg-[var(--midDark)] [&_img]:hover:scale-110"
>
	<div class="aspect-square overflow-hidden rounded-full border-2 border-[var(--mid)]">
		<img
			src={imageSrc}
			class=" h-full w-full object-cover transition-all duration-500 ease-out"
			alt=""
		/>
	</div>
	<div class="m-auto mt-12 sm:w-3/4 md:mt-16">
		<h2 class="font-serif text-2xl text-[var(--midLight)] md:text-4xl">{name}</h2>
		<p class="text-lg font-thin italic text-[var(--light)] md:text-xl">{date}</p>
		<p class="text-xl font-light text-[var(--light)] md:text-2xl">{logline}</p>
	</div>
</div>

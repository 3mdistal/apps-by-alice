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
	class="w-[550px] rounded-2xl border-2 border-[var(--midLight)] bg-[var(--midDark)] px-10 py-32 transition-all duration-[750ms] ease-out hover:border-[var(--midDark)] hover:bg-[var(--midLight)] [&_*]:duration-[750ms] [&_*]:ease-out [&_div]:hover:border-[var(--midDark)] [&_h2]:hover:text-[var(--midDark)] [&_img]:hover:scale-110 [&_p]:hover:text-[var(--dark)]"
>
	<div class="aspect-square overflow-hidden rounded-full border-2 border-[var(--midLight)]">
		<img src={imageSrc} class="h-full w-full object-cover" alt="" />
	</div>
	<div class="m-auto mt-12 sm:w-3/4 md:mt-16">
		<h2 class="font-serif text-2xl text-[var(--midLight)] md:text-4xl">
			{name}
		</h2>
		<p class="text-lg font-thin italic text-[var(--light)] md:text-xl">
			{date}
		</p>
		<p class="text-xl font-light text-[var(--light)] md:text-2xl">{logline}</p>
	</div>
</div>

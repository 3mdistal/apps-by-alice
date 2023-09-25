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

<div class="w-[500px]">
	<img
		src={imageSrc}
		class="aspect-square rounded-full border-2 border-[var(--mid)] object-cover"
		alt=""
	/>
	<div class="m-auto mt-12 sm:w-3/4 md:mt-16">
		<h2 class="font-serif text-2xl text-[var(--midLight)] md:text-4xl">{name}</h2>
		<p class="text-lg font-thin italic text-[var(--light)] md:text-xl">{date}</p>
		<p class="text-xl font-light text-[var(--light)] md:text-2xl">{logline}</p>
	</div>
</div>

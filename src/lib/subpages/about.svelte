<script lang="ts">
	import Socials from '$lib/icons/socials.svelte';
	import SubpageContent from '$lib/partials/subpage-content.svelte';
	import About1 from '$text/about/about1.svelte';
	import About2 from '$text/about/about2.svelte';
	import About3 from '$text/about/about3.svelte';
	// @ts-ignore
	import AuthorPhoto from '$images/about/author-photo.jpg?webp';
	// @ts-ignore
	import Mirror from '$images/about/mirror.jpeg?webp';
	// @ts-ignore
	import Owl from '$images/about/owl.png?webp';

	export let accent = '';
</script>

<div class="spacer" />

<SubpageContent {accent}>
	<svelte:fragment slot="heading">
		<strong>tempo immaterial</strong>, verb,
		<em>to dream of perpetual insufficiency.</em>
	</svelte:fragment>
	<svelte:fragment slot="text">
		<About1 {accent} />
	</svelte:fragment>
	<img
		slot="image"
		src={Owl}
		alt="A painting of a Screech Owl staring eerily at the viewer. Painting by Alice Alexandra Moore."
	/>
</SubpageContent>

<div class="spacer" />

<SubpageContent flexDirection="row" {accent}>
	<svelte:fragment slot="heading">
		i grew up in a backwoods town, just above the Ohio River.
	</svelte:fragment>
	<svelte:fragment slot="text">
		<About2 />
	</svelte:fragment>
	<img slot="image" src={AuthorPhoto} alt="Alice Alexandra Moore." />
</SubpageContent>

<div class="spacer" />

<SubpageContent {accent}>
	<svelte:fragment slot="heading">why do i limit my definition of meaningful?</svelte:fragment>
	<svelte:fragment slot="text">
		<About3 {accent} />
	</svelte:fragment>
	<img
		slot="image"
		src={Mirror}
		alt="Painting of a person sitting, holding a mirror. By Alice Alexandra Moore."
	/>
</SubpageContent>

<div class="spacer" />

<div class="flex flex-col items-center">
	<h2 class="max-w-[80%] text-about" style="color: {accent}">have thoughts to share?</h2>
	<div class="flex max-w-none flex-wrap items-start justify-center md:max-w-[80%] md:flex-nowrap">
		<div class="max-w-[80%] md:basis-1/2">
			<p>
				Though I have plans of fuller, richer ways to engage with the work here—even to
				contribute—this is what I have for now. <a
					class="font-medium hover:underline"
					style="color: {accent}"
					href="/connect">My ears are open</a
				>, and as such, I may take my time to consider before replying. I'll get back to you as I'm
				able.
			</p>
		</div>
	</div>
</div>

<div class="spacer" />

<style lang="scss">
	strong {
		font-weight: 600;
	}

	img {
		object-fit: contain;
		border-radius: 50px;
	}

	p {
		margin-bottom: 1.5em;
	}
</style>

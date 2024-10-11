<script lang="ts">
	import SubpageContent from '$lib/partials/subpage-content.svelte';
	import About1 from '../../cms/text/about/about1.svelte';
	import About2 from '../../cms/text/about/about2.svelte';
	import About3 from '../../cms/text/about/about3.svelte';
	import AuthorPhoto from '../../cms/images/about/author-photo.jpg';
	import Mirror from '../../cms/images/about/mirror.jpeg';
	import Owl from '../../cms/images/about/owl.png';

	export let accent = '';
</script>

<div class="spacer"></div>

<SubpageContent
	{accent}
	imageSource={Owl}
	imageAlt="A painting of a Screech Owl staring eerily at the viewer. Painting by Alice Alexandra Moore."
>
	<svelte:fragment slot="heading">
		<strong>tempo immaterial</strong>, verb,
		<em>to dream of perpetual insufficiency.</em>
	</svelte:fragment>
	<svelte:fragment slot="text">
		<About1 {accent} />
	</svelte:fragment>
</SubpageContent>

<div class="spacer"></div>

<SubpageContent
	flexDirection="row"
	{accent}
	imageSource={AuthorPhoto}
	imageAlt="Alice Alexandra Moore"
>
	<svelte:fragment slot="heading">
		i grew up in a backwoods town, just above the Ohio River.
	</svelte:fragment>
	<svelte:fragment slot="text">
		<About2 />
	</svelte:fragment>
</SubpageContent>

<div class="spacer"></div>

<SubpageContent
	{accent}
	imageSource={Mirror}
	imageAlt="Painting of a person sitting, holding a mirror. By Alice Alexandra Moore."
>
	<svelte:fragment slot="heading">why do i limit my definition of meaningful?</svelte:fragment>
	<svelte:fragment slot="text">
		<About3 {accent} />
	</svelte:fragment>
</SubpageContent>

<div class="spacer"></div>

<div class="flex flex-col items-center">
	<h2 class="text-about max-w-[80%]" style="color: {accent}">have thoughts to share?</h2>
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

<div class="spacer"></div>

<style>
	strong {
		font-weight: 600;
	}

	p {
		margin-bottom: 1.5em;
	}
</style>

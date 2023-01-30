<script>
	import Socials from "../icons/socials.svelte";
	import SubpageContent from "../partials/subpage-content.svelte";
	import handleCSSVariables from "../utils/css-variables";
	import { accentColors, state } from "../stores";
	import About1 from "../../cms/about/about1.md";
	import About2 from "../../cms/about/about2.md";
	import About3 from "../../cms/about/about3.md";

	const accentColor = $accentColors[$state];
</script>

<div class="spacer" use:handleCSSVariables={$accentColors[$state]} />

<SubpageContent>
	<svelte:fragment slot="heading">
		<strong>tempo immaterial</strong>, verb,
		<em>to dream of perpetual insufficiency.</em>
	</svelte:fragment>
	<svelte:fragment slot="text">
		<About1 />
	</svelte:fragment>
	<img
		slot="image"
		src="/images/about/owl.png"
		alt="A painting of a Screech Owl staring eerily at the viewer. Painting by Alice Alexandra Moore."
	/>
</SubpageContent>

<div class="spacer" />

<SubpageContent flexDirection="row">
	<!-- TODO: Make this section "My Story" or something keda. -->
	<svelte:fragment slot="heading">
		i grew up in a backwoods town, just above the Ohio River.
	</svelte:fragment>
	<svelte:fragment slot="text">
		<About2 />
	</svelte:fragment>
	<img
		slot="image"
		src="/images/about/author-photo.jpg"
		alt="Alice Alexandra Moore."
	/>
</SubpageContent>

<div class="spacer" />

<SubpageContent>
	<svelte:fragment slot="heading"
		>why do i limit my definition of meaningful?</svelte:fragment
	>
	<svelte:fragment slot="text">
		<About3 />
	</svelte:fragment>
	<img
		slot="image"
		src="/images/about/mirror.jpeg"
		alt="Painting of a person sitting, holding a mirror. By Alice Alexandra Moore."
	/>
</SubpageContent>

<div class="spacer" />

<div class="flex-col flex items-center">
	<h2 class="text-about max-w-[80%]">have thoughts to share?</h2>
	<div class="flex md:max-w-[80%] max-w-none justify-center flex-wrap md:flex-nowrap">
		<p class="md:basis-1/2 max-w-[80%]">
			Though I have plans of fuller, richer ways to engage with the work
			here—even to contribute—this is what I have for now. My ears are
			open, and as such, I may take my time to consider before replying.
			I'll get back to you as I'm able.
		</p>
		<div class="md:basis-1/2">
			<Socials />
		</div>
	</div>
</div>

<div class="spacer" />

<style lang="scss">
	strong {
		font-weight: 600;
		color: var(--accentColor);
	}

	em {
		color: var(--accentColor);
	}

	img {
		object-fit: contain;
		border-radius: 50px;
	}

	p {
		margin-bottom: 1.5em;
	}

	.heading {
		font-size: clamp(1rem, 1.5vw, 2rem);
		font-weight: 400;
	}
</style>

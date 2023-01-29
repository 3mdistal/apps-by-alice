<script>
	import HomepageSection from "./homepage-section/homepage-section.svelte";
	import HomepageSectionContent from "./homepage-section/homepage-section-content.svelte";
	import { state, backgroundColors, names } from "../stores";
	import Socials from "../icons/socials.svelte";
	import Button from "../icons/button.svelte";
	import { spring, animate, stagger } from "motion";
	import { onMount } from "svelte";

	import Hand from "../images/homepage/flowers-in-hand.webp?webp";
	import Piano from "../images/homepage/piano-with-chair.png?webp";
	import Rabbit from "../images/homepage/rabbit-in-hat.png?webp";
	import Bird from "../images/homepage/bird.png?webp";

	let homepageWrapper;

	onMount(() => {
		homepageWrapper.style.opacity = 1;
		animate(
			homepageWrapper.children,
			{ scaleY: [0, 0.8, 0.9, 1], transformOrigin: "bottom" },
			{
				delay: stagger(0.1, { start: 1.5, from: "last" }),
				easing: spring(),
				allowWebkitAcceleration: true,
			}
		);
	});
</script>

<div>
	<nav
		class="relative bottom-[-40px] h-[100vh] w-[100%] opacity-0"
		bind:this={homepageWrapper}
	>
		{#each $names as name}
			{#if $state == "home" || $state == name}
				<HomepageSection color={$backgroundColors[name]} {name} />
			{/if}
		{/each}
	</nav>

	<article>
		{#if $state == "about" && $state != "home"}
			<HomepageSectionContent
				header="i'm alice, a digital creator."
				description="Welcome to Tempo Immaterial, a place that both showcases my
			own work and acts as the starting point for yours. I'm proud
			to be a queer, multi-disciplinary creative who works from
			the heart to elevate new and unique projects."
				src={Hand}
				alt="A painted hand holding out flowers."
			/>
		{/if}

		{#if $state == "studio" && $state != "home"}
			<HomepageSectionContent
				header="i keep chasing new ideas."
				description="I've always been someone who dabbles in everything; learning
			new arts keeps me happy. In my studio, you'll find
			paintings, poems, songs, fiction, memoir, fantasy, and more."
				src={Piano}
				alt="A painting of an upright piano and empty wooden chair."
			/>
		{/if}

		{#if $state == "commissions" && $state != "home"}
			<HomepageSectionContent
				header="hire me for ambitious projects."
				description="I can help you launch and fly the ideas you don't know how
			to get off the ground. I specialize in organizing difficult
			to categorize work and creating custom designs and workflows
			to meet your unique needs."
				src={Rabbit}
				alt="A painting of a rabbit coming out of a hat."
			>
				<Button
					slot="button"
					text="Let's make it."
					url="mailto:commissions@alicealexandra.com"
				/>
			</HomepageSectionContent>
		{/if}

		{#if $state == "blog" && $state != "home"}
			<HomepageSectionContent
				header="unearth some thoughts (soon)."
				description="I'll be using the blog to keep you up to date on creative
			work, site revisions, and life updates."
				src={Bird}
				alt="A painting of a colorful bird in flight."
			/>
		{/if}

		{#if $state == "connect" && $state != "home"}
			<HomepageSectionContent
				header="let's keep in touch."
				description="A newsletter is coming soon, but for now feel free to reach
			out to me on any of my socials."
			>
				<span slot="image">
						<Socials />
				</span>
			</HomepageSectionContent>
		{/if}
	</article>
</div>

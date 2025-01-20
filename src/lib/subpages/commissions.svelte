<script lang="ts">
	import Form from '../partials/form.svelte';

	import gsap from 'gsap';
	import { loadScrollTrigger } from '$lib/partials/load-scroll-trigger';
	import { onMount } from 'svelte';

	export let accent: string;
	export let background: string;

	let heroText: HTMLDivElement;
	let header: HTMLDivElement;
	let truth: HTMLDivElement;
	let ambitious: HTMLDivElement;
	let descriptions: HTMLDivElement;

	function heroAnimation() {
		gsap.from(heroText, {
			scrollTrigger: {
				trigger: heroText,
				scrub: true,
				end: 'bottom 70%'
			},
			opacity: 0,
			scale: 1.5,
			duration: 1
		});
	}

	function headerAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: header,
				scrub: true,
				end: 'bottom 30%'
			}
		});
		tl.from(header, { opacity: 0, duration: 0.5 })
			.from(
				header.querySelector('img'),
				{
					opacity: 0,
					scale: 0.6,
					duration: 0.5
				},
				'<'
			)
			.from(header.querySelectorAll('p'), { opacity: 0, stagger: 0.25, duration: 1 }, '<');
	}

	function truthsAnimation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: truth,
				scrub: true,
				end: '70% 50%'
			}
		});
		tl.from(truth.querySelector('h2'), { opacity: 0, y: -100 }, '<')
			.from(truth.querySelector('.heading'), { opacity: 0, x: -50 }, '<')
			.from(
				truth.querySelectorAll('p:not(.heading)'),
				{
					opacity: 0,
					y: 50,
					stagger: 0.25
				},
				'<'
			);
	}

	function ambitiousAnimation() {
		gsap.from(ambitious, {
			opacity: 0,
			scale: 0.8,
			scrollTrigger: { trigger: ambitious, scrub: true },
			end: 'bottom 20%'
		});
	}

	function descriptionsAnimation() {
		const elements = Array.from(descriptions.children);
		elements.forEach((description) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: description,
					scrub: true,
					end: 'bottom 70%'
				}
			});
			tl.from(description.querySelector('.text'), {
				opacity: 0,
				y: -100,
				stagger: 0.25
			}).from(
				description.querySelector('.image'),
				{
					opacity: 0,
					y: 100,
					stagger: 0.1
				},
				'<'
			);
		});
	}

	async function animateAll(sti) {
		gsap.registerPlugin(sti);
		heroAnimation();
		headerAnimation();
		truthsAnimation();
		ambitiousAnimation();
		descriptionsAnimation();
	}

	let scrollTriggerInstance;

	onMount(async () => {
		scrollTriggerInstance = await loadScrollTrigger();
		setTimeout(() => animateAll(scrollTriggerInstance), 50);
	});
</script>

<div class="spacer"></div>
<div class="commissions-container">
	<div class="hero" bind:this={heroText}>
		<div class="hero-text">
			<p style="color: {accent}">Bring your impossible, intangible things.</p>
		</div>
	</div>
	<div class="spacer"></div>
	<div class="header" bind:this={header} style="border-color: {accent}">
		<div class="header-text">
			<p style="color: {accent}">alice</p>
			<p style="color: {accent}">alexandra</p>
			<p style="color: {accent}">moore</p>
		</div>
		<div>
			<img class="header-image" src="/images/commissions/circle.svg" alt="" />
		</div>
		<div>
			<p style="color: {accent}">developer</p>
			<p style="color: {accent}">artist</p>
			<p style="color: {accent}">editor</p>
		</div>
	</div>
	<div class="spacer"></div>
	<div class="truths" bind:this={truth} style="background-color: {accent}">
		<h2>Here are my truths.</h2>
		<div>
			<p class="truth-heading" style="color: {background}">I respect your ideas.</p>
			<p style="color: {background}">
				To me, this is more than a statement. My favorite thing about the process of editing
				another's work is pulling forward their own voice, their own originality. This stems not
				from my skill of speaking, but from listening.
			</p>
			<p style="color: {background}">
				I bring this ethic into all my work. I'm most excited about elaborating on your notions,
				whether it's designing you a website, painting a portrait, or editing your book. You are the
				focus of my attention, and you should be happy with whatever I create—else I've done my job
				wrong.
			</p>
			<p style="color: {background}">
				We can be in conversation as much or as little as you want during my work, and I'll strive
				to match the product to the image in your head, plus all the creativity and experience I
				bring.
			</p>
		</div>
	</div>
	<div class="spacer"></div>
	<div class="ambitious" style="color: {accent}; border-color: {accent}" bind:this={ambitious}>
		<p>Ambitious project? Tired of finding experts? I do it all.</p>
	</div>
	<div class="descriptions" bind:this={descriptions}>
		<div class="flex">
			<div class="text">
				<h2 style="color: {accent}">Developer</h2>
				<p>
					Look around the website. Like what you see? I make elegant websites for ambitious
					projects. I'm passionate about design matching the focus of the work. I've long been
					frustrated with sites like Medium or Wattpad that don't allow for the full customization
					the web has to offer. I can work with you to get your content—whatever its type—into a
					gorgeous layout.
				</p>
			</div>
			<div class="image">
				<img src="/images/commissions/developer.jpeg" alt="Building blocks of the web." />
			</div>
		</div>
		<div class="flipped flex">
			<div class="text">
				<h2 style="color: {accent}">Artist</h2>
				<p>
					Check out my gallery of art. If you like what you see, I can paint you one even better.
					I'm constantly learning and improving my art, and each new piece feels like my best. I put
					an extraordinary level of detail in every painting I make, focusing on brushstrokes,
					careful coloring, emotion, and dynamic light.
				</p>
			</div>
			<div class="image">
				<img src="/images/commissions/artist.jpeg" alt="Painting of a woman in a cornfield." />
			</div>
		</div>
		<div class="flex">
			<div class="text">
				<h2 style="color: {accent}">Editor</h2>
				<p>
					Have an idea? It's never too early to brainstorm together. I'll provide suggestions to
					move forward your process, concentrating on your passions. If you want to workshop a
					coherent piece, I'll content edit, looking especially for places to emphasize themes or
					characters through cutting, adding, and sequencing. I begin line edits only for
					near-publishable drafts, clarifying word choice and syntax with a poet's eye for details.
				</p>
			</div>
			<div class="image">
				<img src="/images/commissions/editor.jpeg" alt="A bust made of yellow flowers." />
			</div>
		</div>
	</div>
	<div class="spacer"></div>
	<div class="villain">
		<div id="form">
			<Form {accent} />
		</div>
	</div>
</div>

<style>
	.commissions-container {
		max-width: 100vw;
		overflow: hidden;
	}

	.hero {
		@media (hover: hover) {
			background-attachment: fixed;
		}
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		background-image: url('/images/commissions/impossible.jpeg');
		background-position: 35%;
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.hero-text {
		z-index: 100;
		margin: 0 2em;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 3em;
	}

	.hero p {
		font-size: clamp(1.5rem, 3vw, 4rem);
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin: 0 auto;
		border-width: 2px;
		border-style: solid;
		border-radius: 0.5rem;
		padding: 3em 1em;
		max-width: 350px;
	}

	.header-text {
		text-align: right;
	}

	.header-image {
		width: 100px;
	}

	.header p {
		font-size: 1rem;
	}

	@media (min-width: 640px) {
		.header {
			max-width: 400px;
		}
		.header-image {
			width: 125px;
		}
	}

	@media (min-width: 768px) {
		.header {
			gap: 2rem;
			max-width: 450px;
		}
		.header-image {
			width: 150px;
		}
		.header p {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.header {
			max-width: 800px;
		}
		.header-image {
			width: 200px;
		}
		.header p {
			font-size: 2.25rem;
		}
	}

	.truth-heading {
		font-weight: 500;
	}

	.truths {
		display: flex;
		margin: 0 auto;
		background-color: var(--accentColor);
		padding: 6em;
		width: 90%;
		& h2 {
			width: 50%;
			color: #fafafa;
		}

		& div {
			width: 50%;
		}

		& p {
			margin-bottom: 1.5em;
		}

		@media screen and (max-width: 45rem) {
			column-gap: 1px;
			row-gap: 2em;
			flex-wrap: wrap;
			padding: 3em;

			& h2,
			div {
				width: 100%;
			}

			& p {
				max-width: 50ch;
			}
		}

		@media screen and (max-width: 30rem) {
			padding: 2em;
			width: 100%;
		}
	}

	.ambitious {
		margin: calc(1em + 5vw);
		border-top: solid 2px;
		border-bottom: solid 2px;
		padding: calc(1em + 5vw);

		& p {
			color: var(--accentColor);
			font-size: clamp(1.5rem, 3vw, 4rem);
			text-align: center;
		}
	}

	.descriptions {
		display: flex;
		row-gap: 10em;
		flex-direction: column;
		padding: 15vw;
		@media screen and (max-width: 45rem) {
			padding: 7vw;
		}
		@media screen and (max-width: 30rem) {
			padding: 4vw;
		}

		& .flex {
			display: flex;
			column-gap: calc(1em + 10vw);
			justify-content: center;
			align-items: center;

			& .text {
				max-width: 50%;

				& h2 {
					margin-bottom: 1em;
				}

				& p {
					max-width: 50ch;
				}
			}

			& .image {
				border-top-right-radius: 10px;
				border-top-left-radius: 50px;
				border-bottom-right-radius: 50px;
				border-bottom-left-radius: 10px;
				max-width: 45%;
				overflow: hidden;
			}

			@media screen and (max-width: 40rem) {
				row-gap: 3em;
				flex-wrap: wrap;

				& .text {
					max-width: 75%;
				}

				& .image {
					max-width: 75%;
				}
			}
		}

		& .flipped {
			flex-direction: row-reverse;
		}
	}

	.villain {
		background-image: url('/images/commissions/villain.jpeg');
		@media (hover: hover) {
			background-attachment: fixed;
		}
		display: flex;
		justify-content: center;
		align-items: center;
		background-size: cover;
		background-repeat: no-repeat;
		padding: 2rem;
		height: 100vh;

		& div {
			border-radius: 10px;
			background-color: rgba(255, 255, 255, 0.3);
			padding: 5em;
			width: min(800px, 100%);
		}

		@media screen and (max-width: 50rem) {
			padding: 5em;
		}

		@media screen and (max-width: 35rem) {
			padding: 2em;

			& div {
				padding: 3em;
			}
		}

		@media screen and (max-width: 30rem) {
			padding: 1em;

			& div {
				padding: 2em;
			}
		}
	}
</style>

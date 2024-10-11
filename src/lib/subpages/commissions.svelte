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

<div class="spacer" />
<div class="max-w-[100vw] overflow-hidden">
	<div
		class="hero relative flex h-[100vh] w-[100%] items-center justify-center overflow-hidden bg-[url('/images/commissions/impossible.jpeg')] bg-cover bg-no-repeat"
	>
		<div class="text p-[3em]" bind:this={heroText}>
			<p style="color: {accent}">Bring your impossible, intangible things.</p>
		</div>
	</div>
	<div class="spacer" />
	<div
		class="header mx-auto flex max-w-[350px] items-center justify-center gap-x-4 rounded-lg border-2 px-[1em] py-[3em] sm:max-w-[400px] md:max-w-[450px] md:gap-x-8 lg:max-w-[800px] [&_p]:md:text-2xl [&_p]:lg:text-3xl [&_p]:lg:text-4xl"
		bind:this={header}
		style="border-color: {accent}"
	>
		<div class="text-right">
			<p style="color: {accent}">alice</p>
			<p style="color: {accent}">alexandra</p>
			<p style="color: {accent}">moore</p>
		</div>
		<div>
			<img
				class="w-[100px] sm:w-[125px] md:w-[150px] lg:w-[200px]"
				src="/images/commissions/circle.svg"
				alt=""
			/>
		</div>
		<div>
			<p style="color: {accent}">developer</p>
			<p style="color: {accent}">artist</p>
			<p style="color: {accent}">editor</p>
		</div>
	</div>
	<div class="spacer" />
	<div class="truths" bind:this={truth} style="background-color: {accent}">
		<h2>Here are my truths.</h2>
		<div>
			<p class="font-medium" style="color: {background}">I respect your ideas.</p>
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
	<div class="spacer" />
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
	<div class="spacer" />
	<div class="villain">
		<div id="form">
			<Form {accent} />
		</div>
	</div>
</div>

<style lang="scss">
	.hero {
		@media (hover: hover) {
			background-attachment: fixed;
		}
		background-position: 35%;

		& p {
			font-size: clamp(1.5rem, 3vw, 4rem);
		}

		& .text {
			background-color: rgba(255, 255, 255, 0.5);
			z-index: 100;
			border-radius: 10px;
			margin: 0 2em 0 2em;
		}
	}

	.truths {
		background-color: var(--accentColor);
		display: flex;
		width: 90%;
		margin: 0 auto;
		padding: 6em;

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
			flex-wrap: wrap;
			row-gap: 2em;
			column-gap: 1px;
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
			width: 100%;
			padding: 2em;
		}
	}

	.ambitious {
		border-top: solid 2px;
		border-bottom: solid 2px;
		padding: calc(1em + 5vw);
		margin: calc(1em + 5vw);

		& p {
			font-size: clamp(1.5rem, 3vw, 4rem);
			color: var(--accentColor);
			text-align: center;
		}
	}

	.descriptions {
		display: flex;
		flex-direction: column;
		row-gap: 10em;
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
			align-items: center;
			justify-content: center;

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
				max-width: 45%;
				border-top-left-radius: 50px;
				border-bottom-right-radius: 50px;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 10px;
				overflow: hidden;
			}

			@media screen and (max-width: 40rem) {
				flex-wrap: wrap;
				row-gap: 3em;

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
		background-size: cover;
		background-repeat: no-repeat;
		padding: 10em clamp(2em, 20vw, 20em);
		min-height: 100vh;

		& div {
			width: 100%;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 10px;
			padding: 5em;
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
